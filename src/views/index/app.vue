<template>
  <div class="jp-type flex center" @click="setInputFocus">
    <div class="jp-type--ctr">
      <div class="jp-type--stats flex column items-end">
        <div><span>耗时：</span><span class="jp-type--stats-text">{{ timeTotalText }}</span></div>
        <div><span>速度：</span><span class="jp-type--stats-text">{{ timeSpeed }}个/分钟</span></div>
      </div>
      <div class="jp-type--hint mpm-mauto" v-if="currentLetter">
        <div class="jp-type--preview flex center">
          <div class="jp-type--preview-text">
            {{ currentLetter.mainJP }}
          </div>
          <div class="jp-type--annotation">
            <div class="jp-type--annotation-row flex justify-between">
              <span>罗马字：{{ currentLetter.luoma }}</span>
              <span>汉字：{{ currentLetter.mainCN }}</span>
            </div>
            <div class="jp-type--annotation-row flex justify-between">
              <span>联想：{{ currentLetter.think }}</span>
            </div>
          </div>
        </div>
        <div class="jp-type--preview-other flex center">
          <div class="jp-type--preview-text-other">
            {{ currentLetter.subJP }}
          </div>
          <div class="jp-type--annotation">
            <div class="jp-type--annotation-row flex justify-end">
              <div>汉字：{{ currentLetter.subCN }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="jp-type--show">
        <span class="jp-type--show-text" v-for="(item,index) in list"
              :key="index">{{ item.mainJP }}</span>
      </div>
      <div class="jp-type--show mpm-mt12 ">
        <span class="jp-type--show-text jp-type--input-text" v-for="(item,index) in inputList" :key="index" :class="{
          wrong: item !== list[index].mainJP
        }">{{ item }}</span><input ref="input" class="jp-type--input"
                                   :class="{'wrong':currentWrong}"
                                   v-model.trim="input"
                                   :maxlength="isFinished ? 0 : 10"
                                   @input="onCheck"
                                   @keydown.delete="onDelete"
                                   @keydown.enter="onFinish"
                                   @keyup="onInsert"
      >
      </div>
      <div class="mpm-relative">
        <div class="jp-type--reset" @click="change()">重新练习</div>
        <div class="jp-type--reset-notice" v-if="isFinished">本次练习已完成</div>
      </div>
    </div>
    <div class="jp-type--lesson">
      <div class="jp-type--lesson-head">课程章节</div>
      <div class="jp-type--lesson-head">五十音<br />平假名</div>
      <div class="jp-type--lesson-head">清音</div>
      <div class="jp-type--lesson-list">
        <div class="jp-type--lesson-section" v-for="(item,key,index) in PINGJIA_LETTERS_MAP" :key="key+item[0].mainJP"
             :class="{'active':currentLabel.indexOf(key) !== -1}"
             @click="change(key)">{{ item[0].mainJP }}行
        </div>
      </div>
      <div class="jp-type--lesson-head">五十音<br />片假名</div>
      <div class="jp-type--lesson-head">清音</div>
      <div class="jp-type--lesson-list">
        <div class="jp-type--lesson-section" v-for="(item,key,index) in PIANJIA_LETTERS_MAP" :key="key+item[0].mainJP"
             :class="{'active':currentLabel.indexOf(key) !== -1}"
             @click="change(key)">{{ item[0].mainJP }}行
        </div>
      </div>

    </div>
    <div class="jp-type--edition-info">
      <div>v{{ process.BUILD.APP_VERSION }}</div>
      <div>{{ process.BUILD.BUILD_DATE }}</div>
    </div>
  </div>
</template>

<script>
import PINGJIA_LETTERS_MAP from '../data/pingjia-letters'
import PIANJIA_LETTERS_MAP from '../data/pianjia-letters'

export default {
  data() {
    return {
      LETTERS_MAP: {
        ...PINGJIA_LETTERS_MAP,
        ...PIANJIA_LETTERS_MAP,
      },
      PINGJIA_LETTERS_MAP,
      PIANJIA_LETTERS_MAP,
      list: [],
      inputList: [],
      input: '', // 已输入值
      lastInput: '', // 上一个输入的键
      current: 0,
      currentWrong: false,
      currentLabel: [],
      sliceLength: 50,
      timer: null, // 计时器
      timeTotal: 0, // 总耗时
      timeSpeed: 0, // 打字速度统计
      defaultLabel: JSON.parse(localStorage.getItem('currentLabel')) || 'X_PINGJIA_LETTERS',
    }
  },
  computed: {
    currentLetter() {
      if (this.current === this.sliceLength) {
        return this.list[this.sliceLength - 1]
      } else {
        return this.list[this.current]
      }
    },
    timeTotalText() {
      if (this.timeTotal <= 59 * 1000) {
        return dayjs(this.timeTotal).format('s秒')
      } else {
        return dayjs(this.timeTotal).format('m分s秒')
      }
    },
    // 练习是否完成，若练习完成，则不可再删除或者输入，只能进行重新练习，且停止计时统计等
    isFinished() {
      return this.inputList.length === this.list.length
    },
  },
  watch: {
    isFinished() {
      if (this.isFinished) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
  },
  methods: {
    change(label) {
      // 清空已输入内容
      clearInterval(this.timer)
      this.timer = null
      this.timeTotal = 0 // 总耗时
      this.timeSpeed = 0 // 打字速度统计
      this.inputList = []
      this.current = 0
      this.input = ''
      this.lastInput = ''
      this.currentWrong = false

      // 如果label为空，则不处理currentLabel的值
      // 取消时若为最后一项则不允许取消
      if (label) {
        const labelList = typeof label === 'string' ? [label] : label

        labelList.forEach((labelItem) => {
          const currentLabelIndex = this.currentLabel.indexOf(labelItem)

          if (currentLabelIndex === -1) {
            this.currentLabel.push(labelItem)
          } else if (currentLabelIndex >= 0 && this.currentLabel.length > 1) {
            this.currentLabel.splice(currentLabelIndex, 1)
          }
        })

        // 将当前选中的字符存放到ls中，缓存
        localStorage.setItem('currentLabel', JSON.stringify(this.currentLabel))
      }

      const LETTER_LIST = this.currentLabel.reduce((list, labelItem) => {
        list = list.concat(this.LETTERS_MAP[labelItem])
        return list
      }, [])

      const list = []

      for (let i = 0; i < this.sliceLength; i++) {
        const index = Math.floor(Math.random() * 100 % LETTER_LIST.length)

        list.push(LETTER_LIST[index])
      }

      this.list = list

      this.setInputFocus()
    },
    // 按了回车键的时候判断值是否正确
    onCheck(e) {
      // 开始计时
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.timeTotal += 1000
          this.timeSpeed = Math.floor(this.inputList.length / (this.timeTotal / 1000) * 60)
        }, 1000)
      }

      // 不存在值的时候，关闭错误提示
      // 按了回车之后再检查（补充）
      if (['insertCompositionText', 'insertText'].indexOf(e.inputType) >= 0) {
        this.lastInput = e.data ? e.data.slice(-1) : ''
      }
    },
    onInsert(e) {
      if (e.key === 'Backspace') return
      if (!this.input) return

      // 如果加上去的数量超过总数量时，则进行截断

      const exceedCount = (this.current + this.input.length) - this.sliceLength

      const needInsertInput = exceedCount > 0
        ? this.input.split('').slice(0, -exceedCount)
        : this.input.split('')

      this.inputList = this.inputList.concat(needInsertInput)

      if ((this.current + needInsertInput.length) >= this.sliceLength) {
        this.current = this.sliceLength
      } else {
        this.current += needInsertInput.length
      }

      this.reset()
    },

    onDelete() {
      if (this.isFinished) return
      if (this.current <= 0) return
      if (this.lastInput || this.input) return

      this.inputList.pop()
      this.current--

      this.reset()
    },
    onFinish() {
      if (this.isFinished) this.change()
    },
    reset() {
      this.input = ''
      this.lastInput = ''
      this.currentWrong = false
    },
    setInputFocus() {
      setImmediate(() => {
        this.$refs.input.focus()
      })
    },
  },
  mounted() {
    // 默认的为平假名元音行
    this.change(this.defaultLabel)
  },
}
</script>

<style lang="scss">
.jp-type {
  padding: 40PX 20PX;
  min-height: 100vh;
  background-color: #4a4648;
  color: white;
}

.jp-type--ctr {
  position: relative;
  min-width: 780PX;
  max-width: 780PX;
}

.jp-type--hint {
  position: relative;
  width: 150PX;
  margin: 0 auto;
  transform: translateX(-30PX);
  margin-bottom: 90PX;
}

.jp-type--preview, .jp-type--preview-other {
  position: relative;
  width: 100%;
  height: 150PX;
  border-radius: 10PX;
  border: 3PX solid white;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1PX dashed #777174;
  }

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    transform: translateX(-50%);
    border: 1PX dashed #777174;
  }
}

.jp-type--preview-text, .jp-type--preview-text-other {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 110PX;
  text-shadow: 2PX 2PX 8PX rgba(0, 0, 0, 0.3);
}


.jp-type--preview-other {
  position: absolute;
  right: -100PX;
  bottom: 0;
  width: 80PX;
  height: 80PX;
  border: 3PX solid white;
}

.jp-type--preview-text-other {
  z-index: 2;
  font-size: 50PX;

}

.jp-type--stats {
  position: absolute;
  right: 0;
  top: 0;
  color: #ddd;
  font-size: 12PX;
  line-height: 1.4;
}

.jp-type--stats-text {
  display: inline-block;
  width: 70PX;
}


.jp-type--annotation {
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  padding: 0;
  width: 100%;
  font-size: 12PX;
  line-height: 1.3;
  color: #ddd;
}

.jp-type--annotation-row {
  margin-top: 14PX;
  line-height: 1.3;
}

.jp-type--input {
  border-bottom: 1PX solid #dddddd;
  width: 38PX;
  height: 38PX;
  line-height: 38PX;
  text-align: center;
  color: white;
  font-size: 26PX;
}

.jp-type--show {
  min-height: 120PX;

  line-height: 0;
  font-size: 0;
}

.jp-type--show-text {
  width: 38PX;
  height: 38PX;
  line-height: 38PX;
  display: inline-block;
  text-align: center;
  font-size: 26PX;
  text-shadow: 2PX 2PX 4PX rgba(0, 0, 0, 0.2);

  &.wrong {
    color: #ff8c8c;
  }
}

.jp-type--input-text {
  color: #5c7fdb;
}

.jp-type--lesson {
  position: fixed;
  right: -12PX;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 12PX;
  line-height: 1.3;
}

.jp-type--lesson-head {
  padding: 4PX 14PX 4PX 4PX;
  background-color: #504d51;
}


.jp-type--lesson-section {
  padding: 4PX 14PX 4PX 4PX;
  transition: all 0.3s ease;
  background-color: #3e3c3f;
  cursor: pointer;

  &.active {
    background-color: #6e6c7a;
    transform: translateX(-6PX) scale(1.1);
    box-shadow: -2PX 2PX 2PX rgba(0, 0, 0, 0.1);
  }

  &:hover {
    background-color: #6e6c7a;
  }
}

.jp-type--reset {

  background-color: #6e6c7a;
  width: 160PX;
  font-size: 16PX;
  letter-spacing: 1PX;
  height: 46PX;
  line-height: 46PX;
  margin: 60PX auto 0;
  text-align: center;
  border-radius: 6PX;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 1PX 5PX 15PX rgba(0, 0, 0, 0.2);

  &:hover {
    letter-spacing: 3PX;
    transform: scale(1.1) translateY(-6PX);
    background-color: #5a5964;
    font-size: 18PX;

    box-shadow: 1PX 5PX 20PX rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(1) translateY(4PX);
  }
}

.jp-type--reset-notice {
  position: absolute;
  bottom: -24PX;
  font-size: 12PX;
  left: 50%;
  color: #888;
  transform: translateX(-50%);
  line-height: 1;
}

.jp-type--edition-info {
  position: absolute;
  text-align: right;
  bottom: 10PX;
  right: 10PX;
  font-size: 12PX;
  color: #777;
  line-height: 1.3;
}
</style>
