## vue-clipboard2 实现复制粘贴

#### 1.先下载`vue-clipboard2 `

````bash
cnpm install vue-clipboard2 --save-dev
````

#### 2.在`main.js`引入配置

````js
// 复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
````

#### 3.在组件里面的用法

##### html

````html
<!--v-clipboard:copy="要复制的内容"-->
<!-- v-clipboard:success="onCopy"，复制成功执行的函数-->
<!--v-clipboard:error="onError",复制失败执行的函数-->
<div class="footerButton copyBank" v-clipboard:copy="b.BankNo" v-	clipboard:success="onCopy" v-clipboard:error="onError">
                	{{$t("m.recharge.copyBank")}}
</div>

````

##### js

````js
//复制成功执行的函数
onCopy(e) {
    this.isShowCopy=true;
    this.showCopyResult=this.$t("m.recharge.copySuccess");
    },
//复制失败执行的函数
onError(e) {
    this.isShowCopy=true;
    this.showCopyResult=this.$t("m.recharge.copyFail");
},
````

[参考链接](https://www.npmjs.com/package/vue-clipboard2)