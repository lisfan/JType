(function(t){function i(i){for(var a,o,s=i[0],u=i[1],c=i[2],h=0,p=[];h<s.length;h++)o=s[h],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);l&&l(i);while(p.length)p.shift()();return r.push.apply(r,c||[]),e()}function e(){for(var t,i=0;i<r.length;i++){for(var e=r[i],a=!0,o=1;o<e.length;o++){var u=e[o];0!==n[u]&&(a=!1)}a&&(r.splice(i--,1),t=s(s.s=e[0]))}return t}var a={},n={index:0},r=[];function o(t){return s.p+"js/"+({eruda:"eruda"}[t]||t)+"."+{eruda:"fe546408"}[t]+".js"}function s(i){if(a[i])return a[i].exports;var e=a[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.e=function(t){var i=[],e=n[t];if(0!==e)if(e)i.push(e[2]);else{var a=new Promise((function(i,a){e=n[t]=[i,a]}));i.push(e[2]=a);var r,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=o(t);var c=new Error;r=function(i){u.onerror=u.onload=null,clearTimeout(h);var e=n[t];if(0!==e){if(e){var a=i&&("load"===i.type?"missing":i.type),r=i&&i.target&&i.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",c.name="ChunkLoadError",c.type=a,c.request=r,e[1](c)}n[t]=void 0}};var h=setTimeout((function(){r({type:"timeout",target:u})}),12e4);u.onerror=u.onload=r,document.head.appendChild(u)}return Promise.all(i)},s.m=t,s.c=a,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var a in t)s.d(e,a,function(i){return t[i]}.bind(null,a));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s.oe=function(t){throw t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=i,u=u.slice();for(var h=0;h<u.length;h++)i(u[h]);var l=c;r.push([0,"chunk-vendors"]),e()})({0:function(t,i,e){t.exports=e("8a8a")},"2fb4":function(t,i,e){},3885:function(t,i,e){},"4f4c":function(t,i,e){},"64dc":function(t,i,e){"use strict";e("4f4c")},"8a8a":function(t,i,e){"use strict";e.r(i);e("e260"),e("e6cf"),e("cca6"),e("a79d"),e("4160"),e("b64b"),e("159b"),e("f5df1"),e("d3b7");var a=e("0b16"),n=e.n(a),r={timeoutID:null,handler:null,init:function(){e.e("eruda").then(e.t.bind(null,"b3bb",7)).then((function(t){var i=t["default"],e=document.createElement("div");document.body.appendChild(e),r.handler=i,i.init({container:e,tool:["console","elements"]})}))}};function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{delay:3e3},i=n.a.parse(location.href,!0),e=i.query;!{ROUTE_MAP:{APP:{ENTRY:"./src/views/index/main.js",TITLE:"日文五十音打字学习"}},PROJECT_NAME:"JType",LIST_PAGE_SIZE:30,MODAL_DURATION:2e3,API:{CODE_KEY:"code",DATA_KEY:"result",MESSAGE_KEY:"message",SUCCESS_CODE:"200",UNAUTH_CODE:["50001"],TIMEOUT:6e4},LOADER:{ERUDA:{ENABLE:!0},SENTRY:{ENABLE:!0,DEBUG:0,DSN:""}},MOCK_SERVER:{HOST:"127.0.0.1",PORT:19999}}.LOADER.ERUDA.ENABLE||"production"==={BUILD_DATE:"2021-01-07 19:37:52",BUILD_AUTHOR:"lisfan",GIT_COMMIT:"337e9bc2b2",GIT_BRANCH:"master",GIT_DATE:"2021-01-07 19:36:20",APP_VERSION:"0.1.0",SDK_VERSION:"0.1.0",SERVER_ENV:"production",API_HOST:"https://domain/api",MOCK_API_HOST:"https://domain/api"}.SERVER_ENV&&"1"!==String(e.eruda_enable)||r.handler||("production"!=={BUILD_DATE:"2021-01-07 19:37:52",BUILD_AUTHOR:"lisfan",GIT_COMMIT:"337e9bc2b2",GIT_BRANCH:"master",GIT_DATE:"2021-01-07 19:36:20",APP_VERSION:"0.1.0",SDK_VERSION:"0.1.0",SERVER_ENV:"production",API_HOST:"https://domain/api",MOCK_API_HOST:"https://domain/api"}.SERVER_ENV?r.init():(clearTimeout(r.timeoutID),r.timeoutID=setTimeout((function(){r.init()}),t.delay)))}e("e7e5");var s=e("d399"),u=(e("66cf"),e("343b")),c=e("2b0e");function h(){s["a"].setDefaultOptions({duration:{ROUTE_MAP:{APP:{ENTRY:"./src/views/index/main.js",TITLE:"日文五十音打字学习"}},PROJECT_NAME:"JType",LIST_PAGE_SIZE:30,MODAL_DURATION:2e3,API:{CODE_KEY:"code",DATA_KEY:"result",MESSAGE_KEY:"message",SUCCESS_CODE:"200",UNAUTH_CODE:["50001"],TIMEOUT:6e4},LOADER:{ERUDA:{ENABLE:!0},SENTRY:{ENABLE:!0,DEBUG:0,DSN:""}},MOCK_SERVER:{HOST:"127.0.0.1",PORT:19999}}.MODAL_DURATION,forbidClick:!0}),c["a"].use(u["a"],{filter:{webp:function(t,i){c["a"].config&&void 0!==c["a"].config.supportWebp||(c["a"].config.supportWebp=i.supportWebp)}},attempt:1,lazyComponent:!0}),new c["a"]({render:function(t){return t("img",{directives:[{name:"lazy"}]})}}).$mount()}c["a"].use(s["a"]).use(u["a"]),o(),h();e("2fb4"),e("dd17"),e("3885");var l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"mpm-component-image",style:{display:t.block?"block":"inline-block",backgroundColor:t.color?t.color:"",width:t.mutatedWidth,height:t.mutatedHeight}},[t.placeholder&&!t.placeholderRemoved?e("span",{staticClass:"pic-placeholder",style:{backgroundImage:"url("+t.placeholderSrc+")"}}):t._e(),t.isHighMode?[t.lazy?e("span",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.highImageLazyload,expression:"highImageLazyload",arg:"background-image"}],staticClass:"lazy-mode pic-high",class:{"animate-loaded":t.hasHighAnimate},style:{backgroundPosition:t.mutatedBackgroundPosition,backgroundSize:t.mutatedBackgroundSize}}):e("span",{staticClass:"pic-high",class:{"animate-loaded":t.hasHighAnimate},style:{backgroundPosition:t.mutatedBackgroundPosition,backgroundSize:t.mutatedBackgroundSize,backgroundImage:"url("+(t.highLoadedError?t.errorPlaceholderSrc:t.highImageSrc)+")"}})]:[t.lowRemoved?t._e():e("span",{staticClass:"pic-low",class:{"animate-loaded":t.hasLowAnimate},style:{backgroundPosition:t.mutatedBackgroundPosition,backgroundSize:t.mutatedBackgroundSize,backgroundImage:"url("+(t.lowLoadedError?t.errorPlaceholderSrc:t.lowImageSrc)+")"}}),t.lazy&&(t.highLoader.loaded||t.lowLoaded)?e("span",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.highImageLazyload,expression:"highImageLazyload",arg:"background-image"}],staticClass:"lazy-mode pic-high",class:{"animate-loaded":t.hasHighAnimate},style:{backgroundPosition:t.mutatedBackgroundPosition,backgroundSize:t.mutatedBackgroundSize}}):t._e(),t.lazy||!t.highLoader.loaded&&!t.lowLoaded?t._e():e("span",{staticClass:"pic-high",class:{"animate-loaded":t.hasHighAnimate},style:{backgroundPosition:t.mutatedBackgroundPosition,backgroundSize:t.mutatedBackgroundSize,backgroundImage:"url("+(t.highLoadedError?t.errorPlaceholderSrc:t.highImageSrc)+")"}})]],2)},p=[],d=(e("99af"),e("c975"),e("a9e3"),e("ac1f"),e("466d"),e("5319"),e("498a"),e("96cf"),e("1da1")),g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABNJREFUOMtjGAWjYBSMglFAVwAABXgAAcVQ1XUAAAAASUVORK5CYII=",m="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABNJREFUOMtjGAWjYBSMglFAVwAABXgAAcVQ1XUAAAAASUVORK5CYII=",f={},E={loadImage:function(t){return new Promise((function(i,e){var a=new Image;a.src=t,a.onload=function(){i("success")},a.onerror=function(){e(new Error("[image load fail]: "+t))}}))}},S={props:{width:{type:[String,Number],default:"auto"},height:{type:[String,Number],default:"auto"},size:{type:String,default:"cover"},position:{type:String,default:"center center"},animate:{type:Number,default:1},src:{type:String,default:""},placeholder:{type:Boolean,default:!0},placeholderSrc:{type:String,default:g},errorPlaceholderSrc:{type:String,default:m},block:Boolean,color:{String:String},low:Boolean,lazy:{type:Boolean,default:!0},prefix:{type:[String,Boolean],default:!0},override:Boolean,format:{type:String,default:function(){return c["a"].config.supportWebp?"webp":"jpg"}},quality:{type:[String,Number],default:"90"},resize:{type:String,default:"m_mfit"},custom:{type:String,default:""}},data:function(){return{DPR:window.devicePixelRatio||2,placeholderRemoved:!1,lowRemoved:!1,lowLoaded:!1,lowLoadedError:!1,highLoaded:!1,highLoadedError:!1,animateCount:0}},computed:{lowLoader:function(){return f[this.lowOSSImageSrc]||{src:"",loaded:!1,count:0}},highLoader:function(){return f[this.highOSSImageSrc]||{src:"",loaded:!1,count:0}},mutatedWidth:function(){return String(this.width).match(/\d$/)?this.width/100+"rem":this.width},mutatedHeight:function(){return String(this.height).match(/\d$/)?this.height/100+"rem":this.height},mutatedBackgroundSize:function(){return this.size.replace(/(\d+)(\D*)\s?/g,(function(t,i,e){return e.trim()?t+" ":Number(i)/100+"rem "}))},mutatedBackgroundPosition:function(){return this.position.replace(/(\d+)(\D*)\s?/g,(function(t,i,e){return e.trim()?t+" ":Number(i)/100+"rem "}))},isHighMode:function(){return!this.low||"png"===this.format||"gif"===this.format},imageSrc:function(){var t="boolean"===typeof this.prefix?{BUILD_DATE:"2021-01-07 19:37:52",BUILD_AUTHOR:"lisfan",GIT_COMMIT:"337e9bc2b2",GIT_BRANCH:"master",GIT_DATE:"2021-01-07 19:36:20",APP_VERSION:"0.1.0",SDK_VERSION:"0.1.0",SERVER_ENV:"production",API_HOST:"https://domain/api",MOCK_API_HOST:"https://domain/api"}.CDN_HOST+this.src:this.prefix+this.src;return this.override?t.replace(/^(.*)\?x-oss-process=.*/,"$1"):t},lowOSSImageSrc:function(){return this.generateImageSrc({format:"jpg",src:this.imageSrc,quality:100,width:10,height:10})},highOSSImageSrc:function(){return this.generateImageSrc({format:this.format,src:this.imageSrc,quality:this.quality})},lowImageSrc:function(){return this.src?this.lowOSSImageSrc:this.placeholderSrc},highImageSrc:function(){return this.src?this.highOSSImageSrc:this.placeholderSrc},highImageLazyload:function(){return{src:this.highImageSrc,error:this.errorPlaceholderSrc}},hasLowAnimate:function(){return!this.lowLoadedError&&(0===this.animate||this.animate>this.lowLoader.count)},hasHighAnimate:function(){return!this.highLoadedError&&(0===this.animate||this.animate>this.highLoader.count)}},methods:{generateImageSrc:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.format,e=t.src,a=t.quality,n=t.width,r=void 0===n?this.width:n,o=t.height,s=void 0===o?this.height:o,u="jpg"===i?"/interlace,1":"",c=Number(r)>0?",w_".concat(Math.round(r/2*this.DPR)):"",h=Number(s)>0?",h_".concat(Math.round(s/2*this.DPR)):"",l=this.resize?"/resize,".concat(this.resize).concat(c).concat(h):"",p=a&&["webp","jpg"].indexOf(i)>=0?"/quality,Q_".concat(a):"",d=i?"/format,".concat(i):"";return e+"?x-oss-process=image"+u+l+p+d+this.custom},lowLoadedHandler:function(){var t=this;return new Promise((function(i){var e=f[t.lowOSSImageSrc];e.count++,setTimeout((function(){t.lowLoaded=!0,e.loaded=!0,i()}),300*Math.random())}))},lowErrorHandler:function(){this.lowLoadedError=!0,this.lowLoader.loaded=!1},highLoadedHandler:function(){var t=this;return new Promise((function(i){var e=f[t.highOSSImageSrc];e.count++,setTimeout((function(){t.highLoaded=!0,e.loaded=!0,i()}),300*Math.random())}))},highErrorHandler:function(){this.highLoadedError=!0,this.highLoader.loaded=!1}},watch:{src:{immediate:!0,handler:function(){this.src&&(f[this.lowOSSImageSrc]||this.$set(f,this.lowOSSImageSrc,{src:this.lowOSSImageSrc,loaded:!1,count:0}),f[this.highOSSImageSrc]||this.$set(f,this.highOSSImageSrc,{src:this.highOSSImageSrc,loaded:!1,count:0}))}},isHighMode:{immediate:!0,handler:function(){var t=this;this.src&&(this.isHighMode?E.loadImage(this.highImageSrc).then(this.highLoadedHandler)["catch"](this.highErrorHandler):E.loadImage(this.lowImageSrc).then(Object(d["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.lowLoadedHandler();case 2:E.loadImage(t.highImageSrc).then(t.highLoadedHandler)["catch"](t.highErrorHandler);case 3:case"end":return i.stop()}}),i)}))))["catch"](this.lowErrorHandler))}},highLoaded:function(){var t=this;this.src&&this.highLoaded&&setTimeout((function(){t.lowRemoved=!0,t.placeholderRemoved=!0}),500+500*Math.random())}}},A=S,j=(e("8b5a"),e("2877")),k=Object(j["a"])(A,l,p,!1,null,"5a00b722",null),_=k.exports,y={"mpm-image":_},T={},v={},I={data:function(){return{process:{env:Object({NODE_ENV:"production",BASE_URL:""}),APP:{ROUTE_MAP:{APP:{ENTRY:"./src/views/index/main.js",TITLE:"日文五十音打字学习"}},PROJECT_NAME:"JType",LIST_PAGE_SIZE:30,MODAL_DURATION:2e3,API:{CODE_KEY:"code",DATA_KEY:"result",MESSAGE_KEY:"message",SUCCESS_CODE:"200",UNAUTH_CODE:["50001"],TIMEOUT:6e4},LOADER:{ERUDA:{ENABLE:!0},SENTRY:{ENABLE:!0,DEBUG:0,DSN:""}},MOCK_SERVER:{HOST:"127.0.0.1",PORT:19999}},BUILD:{BUILD_DATE:"2021-01-07 19:37:52",BUILD_AUTHOR:"lisfan",GIT_COMMIT:"337e9bc2b2",GIT_BRANCH:"master",GIT_DATE:"2021-01-07 19:36:20",APP_VERSION:"0.1.0",SDK_VERSION:"0.1.0",SERVER_ENV:"production",API_HOST:"https://domain/api",MOCK_API_HOST:"https://domain/api"}}}},computed:{$$state:function(){return this.$store.state},$$getters:function(){return this.$store.getters},$$dispatch:function(){return this.$store.dispatch}},methods:{$$pxTransform:function(t){return t/100+"rem"}}},L={CommonMixins:I};function O(t,i){Object.keys(i).forEach((function(e){/^mixin$/.test(t)?c["a"][t](i[e]):c["a"][t](e,i[e])}))}O("component",y),O("filter",T),O("directive",v),O("mixin",L);var b=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"jp-type flex center",on:{click:t.setInputFocus}},[e("div",{staticClass:"jp-type--ctr"},[t.list[t.current]?e("div",{staticClass:"jp-type--hint mpm-mauto"},[e("div",{staticClass:"jp-type--preview flex center"},[e("div",{staticClass:"jp-type--preview-text"},[t._v(" "+t._s("pingjia"===t.currentType?t.list[t.current].pingjia:t.list[t.current].pianjia)+" ")]),e("div",{staticClass:"jp-type--annotation"},[e("div",{staticClass:"jp-type--annotation-row flex justify-between"},[e("span",[t._v("罗马音："+t._s(t.list[t.current].luoma))]),e("span",[t._v(t._s("pingjia"===t.currentType?"草书："+t.list[t.current].caoshu:"楷书："+t.list[t.current].kaishu))])]),e("div",{staticClass:"jp-type--annotation-row flex justify-between"},[e("span",[t._v("联想："+t._s(t.list[t.current].think))])])])]),e("div",{staticClass:"jp-type--preview-other flex center"},[e("div",{staticClass:"jp-type--preview-text-other"},[t._v(" "+t._s("pingjia"===t.currentType?t.list[t.current].pianjia:t.list[t.current].pingjia)+" ")]),e("div",{staticClass:"jp-type--annotation"},[e("div",{staticClass:"jp-type--annotation-row flex justify-end"},[e("div",[t._v(t._s("pingjia"===t.currentType?"楷书："+t.list[t.current].kaishu:"草书："+t.list[t.current].caoshu))])])])])]):t._e(),e("div",{staticClass:"jp-type--show"},t._l(t.list,(function(i,a){return e("span",{key:a,staticClass:"jp-type--show-text"},[t._v(t._s("pingjia"===t.currentType?i.pingjia:i.pianjia))])})),0),e("div",{staticClass:"jp-type--show mpm-mt12 "},[t._l(t.inputList,(function(i,a){return e("span",{key:a,staticClass:"jp-type--show-text jp-type--input-text",class:{wrong:"pingjia"===t.currentType?i!==t.list[a].pingjia:i!==t.list[a].pianjia}},[t._v(t._s(i))])})),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.input,expression:"input",modifiers:{trim:!0}}],ref:"input",staticClass:"jp-type--input",class:{wrong:t.currentWrong},attrs:{maxlength:t.inputList.length===t.list.length?0:1},domProps:{value:t.input},on:{input:[function(i){i.target.composing||(t.input=i.target.value.trim())},t.onCheck],keydown:[function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"delete",[8,46],i.key,["Backspace","Delete","Del"])?null:t.onDelete(i)},function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"enter",13,i.key,"Enter")?null:t.onFinish(i)}],keyup:[t.onInsert,function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"delete",[8,46],i.key,["Backspace","Delete","Del"])?null:t.onReset(i)}],blur:function(i){return t.$forceUpdate()}}})],2),e("div",{staticClass:"jp-type--reset",on:{click:function(i){return t.change(t.currentLabel,t.currentType)}}},[t._v("重新练习")])]),e("div",{staticClass:"jp-type--lesson"},[t._m(0),e("div",{staticClass:"jp-type--lesson-list"},[e("div",{staticClass:"jp-type--lesson-section",class:{active:"pingjia"===t.currentType&&"ALL"===t.currentLabel},on:{click:function(i){return t.change("ALL","pingjia")}}},[t._v("全部 ")]),t._l(t.LETTERS_MAP,(function(i,a){return e("div",{key:a+i[0].pingjia,staticClass:"jp-type--lesson-section",class:{active:"pingjia"===t.currentType&&t.currentLabel===a},on:{click:function(i){return t.change(a,"pingjia")}}},[t._v(t._s(i[0].pingjia)+"行 ")])}))],2),t._m(1),e("div",{staticClass:"jp-type--lesson-list"},[e("div",{staticClass:"jp-type--lesson-section",class:{active:"pianjia"===t.currentType&&"ALL"===t.currentLabel},on:{click:function(i){return t.change("ALL","pianjia")}}},[t._v("全部 ")]),t._l(t.LETTERS_MAP,(function(i,a){return e("div",{key:a+i[0].pianjia,staticClass:"jp-type--lesson-section",class:{active:"pianjia"===t.currentType&&t.currentLabel===a},on:{click:function(i){return t.change(a,"pianjia")}}},[t._v(t._s(i[0].pianjia)+"行 ")])}))],2),e("div",{staticClass:"jp-type--lesson-head"},[t._v("v"+t._s(t.process.BUILD.APP_VERSION)),e("br"),t._v(t._s(t.process.BUILD.BUILD_DATE.slice(0,10))+" ")])])])},R=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"jp-type--lesson-head"},[t._v("五十音"),e("br"),t._v("平假名")])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"jp-type--lesson-head"},[t._v("五十音"),e("br"),t._v("片假名")])}],w=(e("13d5"),e("07ac"),e("130f"),{data:function(){var t={X_LETTERS:[{luoma:"a",pingjia:"あ",pianjia:"ア",caoshu:"安",kaishu:"阿",think:"安全了啊"},{luoma:"i",pingjia:"い",pianjia:"イ",caoshu:"以",kaishu:"伊",think:"以为是你"},{luoma:"u",pingjia:"う",pianjia:"ウ",caoshu:"宇",kaishu:"宇",think:"宇宙无极"},{luoma:"e",pingjia:"え",pianjia:"エ",caoshu:"衣",kaishu:"江",think:"爱上工作"},{luoma:"o",pingjia:"お",pianjia:"オ",caoshu:"於",kaishu:"於",think:"我是天才哦"}],K_LETTERS:[{luoma:"ka",pingjia:"か",pianjia:"カ",caoshu:"加",kaishu:"加",think:"待补充"},{luoma:"ki",pingjia:"い",pianjia:"キ",caoshu:"機",kaishu:"機",think:"待补充"},{luoma:"ku",pingjia:"く",pianjia:"ク",caoshu:"久",kaishu:"久",think:"待补充"},{luoma:"ke",pingjia:"け",pianjia:"ケ",caoshu:"计",kaishu:"介",think:"待补充"},{luoma:"ko",pingjia:"こ",pianjia:"コ",caoshu:"已",kaishu:"己",think:"待补充"}],S_LETTERS:[{luoma:"sa",pingjia:"さ",pianjia:"サ",caoshu:"左",kaishu:"散",think:"待补充"},{luoma:"shi",pingjia:"し",pianjia:"シ",caoshu:"之",kaishu:"之",think:"待补充"},{luoma:"su",pingjia:"す",pianjia:"ス",caoshu:"寸",kaishu:"須",think:"待补充"},{luoma:"se",pingjia:"せ",pianjia:"セ",caoshu:"世",kaishu:"世",think:"待补充"},{luoma:"so",pingjia:"そ",pianjia:"ソ",caoshu:"曾",kaishu:"曾",think:"待补充"}],T_LETTERS:[{luoma:"ta",pingjia:"た",pianjia:"タ",caoshu:"太",kaishu:"多",think:"待补充"},{luoma:"chi",pingjia:"ち",pianjia:"チ",caoshu:"知",kaishu:"千",think:"待补充"},{luoma:"tsu",pingjia:"つ",pianjia:"ツ",caoshu:"川",kaishu:"川",think:"待补充"},{luoma:"te",pingjia:"て",pianjia:"テ",caoshu:"天",kaishu:"天",think:"待补充"},{luoma:"to",pingjia:"と",pianjia:"ト",caoshu:"止",kaishu:"止",think:"待补充"}],N_LETTERS:[{luoma:"na",pingjia:"な",pianjia:"ナ",caoshu:"奈",kaishu:"奈",think:"待补充"},{luoma:"ni",pingjia:"に",pianjia:"ニ",caoshu:"仁",kaishu:"仁",think:"待补充"},{luoma:"nu",pingjia:"ぬ",pianjia:"ヌ",caoshu:"奴",kaishu:"奴",think:"待补充"},{luoma:"ne",pingjia:"ね",pianjia:"ネ",caoshu:"祢",kaishu:"祢",think:"待补充"},{luoma:"no",pingjia:"の",pianjia:"ノ",caoshu:"乃",kaishu:"乃",think:"待补充"}],H_LETTERS:[{luoma:"ha",pingjia:"は",pianjia:"ハ",caoshu:"波",kaishu:"八",think:"待补充"},{luoma:"hi",pingjia:"ひ",pianjia:"ヒ",caoshu:"比",kaishu:"比",think:"待补充"},{luoma:"hu",pingjia:"ふ",pianjia:"フ",caoshu:"不",kaishu:"不",think:"待补充"},{luoma:"he",pingjia:"へ",pianjia:"ヘ",caoshu:"部",kaishu:"部",think:"待补充"},{luoma:"ho",pingjia:"ほ",pianjia:"ホ",caoshu:"保",kaishu:"保",think:"待补充"}],M_LETTERS:[{luoma:"ma",pingjia:"ま",pianjia:"マ",caoshu:"末",kaishu:"末",think:"待补充"},{luoma:"mi",pingjia:"み",pianjia:"ミ",caoshu:"美",kaishu:"三",think:"待补充"},{luoma:"mu",pingjia:"む",pianjia:"ム",caoshu:"武",kaishu:"牟",think:"待补充"},{luoma:"me",pingjia:"め",pianjia:"メ",caoshu:"女",kaishu:"女",think:"待补充"},{luoma:"mo",pingjia:"も",pianjia:"モ",caoshu:"毛",kaishu:"毛",think:"待补充"}],Y_LETTERS:[{luoma:"ya",pingjia:"や",pianjia:"ヤ",caoshu:"也",kaishu:"也",think:"待补充"},{luoma:"yu",pingjia:"ゆ",pianjia:"ユ",caoshu:"由",kaishu:"由",think:"待补充"},{luoma:"yo",pingjia:"よ",pianjia:"ヨ",caoshu:"与",kaishu:"與",think:"待补充"}],R_LETTERS:[{luoma:"ra",pingjia:"ら",pianjia:"ラ",caoshu:"良",kaishu:"良",think:"待补充"},{luoma:"ri",pingjia:"り",pianjia:"リ",caoshu:"利",kaishu:"利",think:"待补充"},{luoma:"ru",pingjia:"る",pianjia:"ル",caoshu:"留",kaishu:"流",think:"待补充"},{luoma:"re",pingjia:"れ",pianjia:"レ",caoshu:"礼",kaishu:"礼",think:"待补充"},{luoma:"ro",pingjia:"ろ",pianjia:"ロ",caoshu:"吕",kaishu:"吕",think:"待补充"}],W_LETTERS:[{luoma:"wa",pingjia:"わ",pianjia:"ワ",caoshu:"和",kaishu:"和",think:"待补充"},{luoma:"wo",pingjia:"を",pianjia:"ヲ",caoshu:"遠",kaishu:"乎",think:"待补充"}]},i=Object.values(t).reduce((function(t,i){return t.concat(i)}),[]);return{LETTERS_MAP:t,ALL_LETTERS_LIST:i,list:[],inputList:[],input:"",lastInput:"",current:0,currentWrong:!1,currentLabel:"",currentType:"",sliceLength:30}},methods:{change:function(t,i){this.inputList=[],this.input="",this.lastInput="",this.current=0,this.currentWrong=!1,this.currentLabel=t,this.currentType=i;for(var e=this.LETTERS_MAP[t]||this.ALL_LETTERS_LIST,a=[],n=0;n<this.sliceLength;n++){var r=Math.floor(100*Math.random()%e.length);a.push(e[r])}this.list=a,this.setInputFocus()},onCheck:function(t){this.lastInput=t.data},onInsert:function(t){"Backspace"!==t.key&&this.input&&(this.inputList.push(this.input),this.current+1<this.sliceLength&&this.current++,this.input="",this.lastInput="",this.currentWrong=!1)},onDelete:function(){this.current<=0||this.lastInput||this.input||(this.inputList.pop(),this.current--,this.input="",this.lastInput="",this.currentWrong=!1)},onFinish:function(){this.list.length===this.inputList.length&&this.change(this.currentLabel,this.currentType)},onReset:function(){this.input||(this.currentWrong=!1)},setInputFocus:function(){var t=this;setImmediate((function(){t.$refs.input.focus()}))}},mounted:function(){this.change("ALL","pingjia")}}),C=w,P=(e("64dc"),Object(j["a"])(C,b,R,!1,null,null,null)),D=P.exports;new c["a"]({render:function(t){return t(D)}}).$mount("#app")},"8b5a":function(t,i,e){"use strict";e("8c02")},"8c02":function(t,i,e){},dd17:function(t,i,e){function a(){return function(){return this}}e("d3b7");var n={};Object.assign(n,{then:a.call(n),catch:a.call(n),done:a.call(n),finally:a.call(n),abort:a.call(n)}),Promise.prototype.done=function(t,i){this.then(t,i)["catch"]((function(t){throw t}))},Promise.prototype["finally"]=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},i=this.constructor;return this.then((function(e){return i.resolve(t()).then((function(){return e}))}),(function(e){return i.resolve(t()).then((function(){throw e}))}))},Promise.prototype.catchError=function(){return this["catch"]((function(){}))},Promise.prototype.abort=function(t){return this["finally"](t),n}}});