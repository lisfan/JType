<template>
  <div
    class="mpm-component-image"
    :style="{
      display: block ? 'block' : 'inline-block',
      backgroundColor: color ? color : '',
      width: mutatedWidth,
      height: mutatedHeight,
    }"
  >
    <span
      v-if="placeholder && !placeholderRemoved"
      class="pic-placeholder"
      :style="{
        backgroundImage: `url(${placeholderSrc})`,
      }"
    ></span>

    <!-- 仅高精度模式 -->
    <template v-if="isHighMode">
      <span
        v-lazy:background-image="highImageLazyload"
        v-if="lazy"
        class="lazy-mode pic-high"
        :class="{ 'animate-loaded': hasHighAnimate }"
        :style="{
          backgroundPosition: mutatedBackgroundPosition,
          backgroundSize: mutatedBackgroundSize,
        }"
      ></span>
      <span
        v-else
        class="pic-high"
        :class="{ 'animate-loaded': hasHighAnimate }"
        :style="{
          backgroundPosition: mutatedBackgroundPosition,
          backgroundSize: mutatedBackgroundSize,
          backgroundImage: `url(${!highLoadedError ? highImageSrc : errorPlaceholderSrc})`,
        }"
      ></span>
    </template>

    <!-- 先低后高精度模式 -->
    <template v-else>
      <!-- 低精度图片会直接加载 -->
      <span
        v-if="!lowRemoved"
        class="pic-low"
        :class="{ 'animate-loaded': hasLowAnimate }"
        :style="{
          backgroundPosition: mutatedBackgroundPosition,
          backgroundSize: mutatedBackgroundSize,
          backgroundImage: `url(${!lowLoadedError ? lowImageSrc : errorPlaceholderSrc})`,
        }"
      ></span>
      <!-- 高精度图片加载 -->
      <span
        v-lazy:background-image="highImageLazyload"
        v-if="lazy && (highLoader.loaded || lowLoaded)"
        class="lazy-mode pic-high"
        :class="{ 'animate-loaded': hasHighAnimate }"
        :style="{
          backgroundPosition: mutatedBackgroundPosition,
          backgroundSize: mutatedBackgroundSize,
        }"
      ></span>
      <span
        v-if="!lazy && (highLoader.loaded || lowLoaded)"
        class="pic-high"
        :class="{ 'animate-loaded': hasHighAnimate }"
        :style="{
          backgroundPosition: mutatedBackgroundPosition,
          backgroundSize: mutatedBackgroundSize,
          backgroundImage: `url(${!highLoadedError ? highImageSrc : errorPlaceholderSrc})`,
        }"
      ></span>
    </template>
  </div>
</template>

<script>
/**
 * 重构 2020-12-03 17:06:57
 * 本次更新点
 *
 * 1. 减少dom的渲染开销（默认情况下，全部为占位图显示，之后图片先通过Image对象预下载，之后再限流展示）
 * 2. low模式支持低清虚图
 * 3. 支持阿里云获取图片风格颜色
 *
 * 阿里云OSS图片加载服务
 *
 * 注意：
 * - [x]png图片不支持调整理质量
 * - vue-lazyload本身好像有bug，会触发两次图片加载?
 *
 * 特性：
 * - [x] 通过背景图方式加载图片，支持背景图适应模式
 * - [ ] 图片加载失败时，可以使用指定错误占位图
 * - [x] 支持四种加载模式
 * -  1. 高精度直接加载：直接触发图片加载
 * -  2. 高精度懒加载：出现在视图中时再加载图片
 * -  3. 低精度直接加载：先直接加载低精度图片，再直接加载高精度图片
 * -  4. 低精度懒加载：先直接加载低精度图片，再懒加载高精度图片[png格式不支持该功能]
 * - [ ] 支持首次加载时触发渐现加载动画（300ms），平滑载入，减少视觉闪现，低精度模式下时，会先加载低精度图片，然后遮盖加载显示高精度图片，显示完毕后的300+1000ms，再移除低精度图片
 *      第二次加载相同图片时，不会再触发动画效果，但可以通过设置animate=0，一直使加载动效有效。设置负值，则表示不进行动效加载
 * - [x] 支持图片区域的颜色占位
 * - [x] 支持一些常用oss参数自定义化：format（格式）、quality（图片质量）、resize（缩放比）、custom（其他附加参数）
 * - [x] 支持覆盖原有的oss参数，override=true
 * - [x] 支持根据用户设备DPR值，自动设定图片大小
 * - [x] 支持根据用户设备是否支持WEBP格式，加载webp图片
 * - [x] 已加载图片，不会再进行加载
 */

import Vue from 'vue'

// 默认占位图(待后续调整为配置项)
const DEFAULT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABNJREFUOMtjGAWjYBSMglFAVwAABXgAAcVQ1XUAAAAASUVORK5CYII='

// 默认错误占位图(待后续调整为配置项)
const ERROR_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABNJREFUOMtjGAWjYBSMglFAVwAABXgAAcVQ1XUAAAAASUVORK5CYII='

const LOADED_MAP = {}

const _actions = {
  // 使用Image对象预下载图片
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const $image = new Image()
      $image.src = src

      $image.onload = () => {
        resolve('success')
      }

      $image.onerror = () => {
        reject(new Error('[image load fail]: ' + src))
      }
    })
  },
}

export default {
  props: {
    // 自定义图片的尺寸，当为数值类型时，会自动转换为rem单位，含单位时则不转
    width: {
      type: [String, Number],
      default: 'auto',
    },
    height: {
      type: [String, Number],
      default: 'auto',
    },
    // 图片的铺展方式
    size: {
      type: String,
      default: 'cover',
    },
    // 图片的位置
    position: {
      type: String,
      default: 'center center',
    },

    // 是否进行启用渐现载入动画
    animate: {
      type: Number,
      default: 1,
    },

    // 图片地址
    src: {
      type: String,
      default: '',
    },

    // 图片下载失败时是否显示占位图，否则会是一张透明的base64图
    placeholder: {
      type: Boolean,
      default: true,
    },

    // 占位图地址
    placeholderSrc: {
      type: String,
      default: DEFAULT_PLACEHOLDER,
    },

    // 错误占位图地址
    errorPlaceholderSrc: {
      type: String,
      default: ERROR_PLACEHOLDER,
    },

    // 是否为块元素
    block: Boolean,
    // 使用颜色占位
    color: { String },
    // 是否优先加载低经精度图片
    low: Boolean,
    // 是否进行惰性加载
    lazy: {
      type: Boolean,
      default: true,
    },

    // 阿里oss处理相关
    // 请求图片时的地址前缀，默认取工程下的通用cdn地址
    prefix: {
      type: [String, Boolean],
      default: true,
    },
    // 是否覆盖src中附带的oss参数
    override: Boolean,
    // 图片格式化，默认jpg
    format: {
      type: String,
      default() {
        if (Vue.config.supportWebp) {
          return 'webp'
        } else {
          return 'jpg'
        }
      },
    },
    // 高精度图片质量
    quality: {
      type: [String, Number],
      default: '90',
    },
    // 图片格式化，默认jpg
    resize: {
      type: String,
      default: 'm_mfit',
    },
    // 其他图片格式化参数
    custom: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      DPR: window.devicePixelRatio || 2,
      placeholderRemoved: false, // 占位图是否被移除
      lowRemoved: false, // 低精度图片是否已被移除
      lowLoaded: false, // 低精度图片是否已加载
      lowLoadedError: false, // 低精度图片是否加载失败
      highLoaded: false, // 高精度图片是否已加载
      highLoadedError: false, // 高精度图片是否加载失败
      animateCount: 0, // 已经执行动画加载的次数
    }
  },
  computed: {
    // 该参数主要体现在image组件被重新实例化的时候
    lowLoader() {
      return (
        LOADED_MAP[this.lowOSSImageSrc] || {
          src: '',
          loaded: false,
          count: 0,
        }
      )
    },
    highLoader() {
      return (
        LOADED_MAP[this.highOSSImageSrc] || {
          src: '',
          loaded: false,
          count: 0,
        }
      )
    },
    mutatedWidth() {
      // 是否为纯数字结尾
      return String(this.width).match(/\d$/) ? this.width / 100 + 'rem' : this.width
    },
    mutatedHeight() {
      // 是否为纯数字结尾
      return String(this.height).match(/\d$/) ? this.height / 100 + 'rem' : this.height
    },
    mutatedBackgroundSize() {
      return this.size.replace(/(\d+)(\D*)\s?/g, ($0, $1, $2) => {
        if (!$2.trim()) return Number($1) / 100 + 'rem '
        return $0 + ' '
      })
    },
    mutatedBackgroundPosition() {
      return this.position.replace(/(\d+)(\D*)\s?/g, ($0, $1, $2) => {
        if (!$2.trim()) return Number($1) / 100 + 'rem '
        return $0 + ' '
      })
    },
    // 是否为高精度模式
    isHighMode() {
      return !this.low || this.format === 'png' || this.format === 'gif'
    },
    // 通用图片拼接
    imageSrc() {
      const prefixSrc = typeof this.prefix === 'boolean' ? process.BUILD.CDN_HOST + this.src : this.prefix + this.src

      return this.override ? prefixSrc.replace(/^(.*)\?x-oss-process=.*/, '$1') : prefixSrc
    },
    // 获取阿里云图片处理后的图片地址
    lowOSSImageSrc() {
      return this.generateImageSrc({
        format: 'jpg',
        src: this.imageSrc,
        quality: 100,
        width: 10,
        height: 10,
      })
    },
    // 获取阿里云图片处理后的图片地址
    highOSSImageSrc() {
      return this.generateImageSrc({
        format: this.format,
        src: this.imageSrc,
        quality: this.quality,
      })
    },

    lowImageSrc() {
      // 如果已经缓存了该图片了
      // if (this.lowLoader.loaded) {
      //   return this.lowLoader.src
      // }
      if (!this.src) {
        return this.placeholderSrc
      }

      return this.lowOSSImageSrc
    },
    highImageSrc() {
      if (!this.src) {
        return this.placeholderSrc
      }
      // // 如果已经缓存了该图片了
      // if (this.highLoader.loaded) {
      //   return this.highLoader.src
      // }

      return this.highOSSImageSrc
    },
    // 懒惰加载对象
    highImageLazyload() {
      return {
        src: this.highImageSrc,
        error: this.errorPlaceholderSrc,
      }
    },
    // 动画次数
    hasLowAnimate() {
      return !this.lowLoadedError && (this.animate === 0 || this.animate > this.lowLoader.count)
    },
    // 动画次数
    hasHighAnimate() {
      console.log(
        1111,
        this.highLoader.count,
        !this.highLoadedError && (this.animate === 0 || this.animate > this.highLoader.count)
      )
      return !this.highLoadedError && (this.animate === 0 || this.animate > this.highLoader.count)
    },
  },
  methods: {
    generateImageSrc({ format, src, quality, width = this.width, height = this.height } = {}) {
      const interlaceProcess = format === 'jpg' ? '/interlace,1' : ''

      // 尺寸的处理
      const widthProcess = Number(width) > 0 ? `,w_${Math.round((width / 2) * this.DPR)}` : ''
      const heightProcess = Number(height) > 0 ? `,h_${Math.round((height / 2) * this.DPR)}` : ''

      const resizeProcess = this.resize ? `/resize,${this.resize}${widthProcess}${heightProcess}` : ''

      // 质量的处理 png不生效
      const qualityProcess = quality && ['webp', 'jpg'].indexOf(format) >= 0 ? `/quality,Q_${quality}` : ''

      const formatProcess = format ? `/format,${format}` : ''

      return (
        src + '?x-oss-process=image' + interlaceProcess + resizeProcess + qualityProcess + formatProcess + this.custom
      )
    },
    lowLoadedHandler() {
      return new Promise((resolve) => {
        const loader = LOADED_MAP[this.lowOSSImageSrc]
        loader.count++

        // 节流，提高性能
        setTimeout(() => {
          this.lowLoaded = true
          loader.loaded = true
          resolve()
        }, Math.random() * 300)
      })
    },
    lowErrorHandler() {
      this.lowLoadedError = true
      this.lowLoader.loaded = false
    },
    highLoadedHandler() {
      return new Promise((resolve) => {
        const loader = LOADED_MAP[this.highOSSImageSrc]
        loader.count++

        // 节流，提高性能
        setTimeout(() => {
          this.highLoaded = true
          loader.loaded = true
          resolve()
        }, Math.random() * 300)
      })
    },
    highErrorHandler() {
      this.highLoadedError = true
      this.highLoader.loaded = false
    },
  },
  watch: {
    src: {
      immediate: true,
      handler() {
        if (!this.src) return
        if (!LOADED_MAP[this.lowOSSImageSrc]) {
          this.$set(LOADED_MAP, this.lowOSSImageSrc, {
            src: this.lowOSSImageSrc,
            loaded: false,
            count: 0,
          })
        }

        if (!LOADED_MAP[this.highOSSImageSrc]) {
          this.$set(LOADED_MAP, this.highOSSImageSrc, {
            src: this.highOSSImageSrc,
            loaded: false,
            count: 0,
          })
        }
      },
    },
    isHighMode: {
      immediate: true,
      handler() {
        if (!this.src) return

        // 仅高清度模式的时候
        if (this.isHighMode) {
          _actions.loadImage(this.highImageSrc).then(this.highLoadedHandler).catch(this.highErrorHandler)
        } else {
          _actions
            .loadImage(this.lowImageSrc)
            .then(async () => {
              await this.lowLoadedHandler()
              _actions.loadImage(this.highImageSrc).then(this.highLoadedHandler).catch(this.highErrorHandler)
            })
            .catch(this.lowErrorHandler)
        }
      },
    },
    // 高精度图片，成功后，移除低精度的图片dom
    highLoaded() {
      if (!this.src) return

      if (this.highLoaded) {
        setTimeout(() => {
          this.lowRemoved = true
          this.placeholderRemoved = true
        }, 500 + Math.random() * 500)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mpm-component-image {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  .pic-placeholder {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background-position: center center;
    background-size: cover;
  }

  .pic-low,
  .pic-high {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    backface-visibility: visible;
    display: block;
    height: 100%;
    opacity: 1;
    width: 100%;
  }

  .pic-high.animate-loaded {
    animation: fadeIn 0.5s linear forwards;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
