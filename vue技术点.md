# 2019 2.15

## 一、vue中websocket用法及封装

#### 1.先下载

```bash
cnpm install vue-socket.io --save-dev
```

#### 2.在src文件夹里面新建lib文件夹，在lib文件夹里面新建socket.js

```js
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios';


var a;
var wesocket = {
    debug: true,
    connection: "",
    vuex: {}
}


//ajax请求接口返回websocket连接
axios({
    method: 'GET',
    url: 'http://192.168.0.110:8091/api/getpushurl',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(function(response) {

    wesocket.connection = response.data + '/price';
    if (wesocket.connection != "") {
        Vue.use(new VueSocketIO(wesocket))

    }

    console.log(response.data)

});
export default a;
```

#### 3.在main.js引入

```js
import VueSocketIO from './lib/socket'

new Vue({
    el: '#app',
    VueSocketIO,
    components: {
        App
    },
    template: '<App/>'
})
```

## 二、vue md5加密用法

#### 1.先下载md5

```bash
cnpm install js-md5 --save-dev
```

#### 2.按需引入

```js
import md5 from "js-md5";

//用法
Pwd: md5(this.password)
```

#### 3.或者在main.js文件中将md5转换成vue原型：

```js
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
//用法
this.$md5('hello world')  // 5eb63bbbe01eeed093cb22bb8f5acdc3
```

## 三、vue中v-touch事件用法

#### 1.先下载

```bash
cnpm install vue-touch --save dev
```

#### 2.在main.js引入

```js
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
```

#### 3.用法

```js
<v-touch v-on:swipeup="goRegister">
   <img src="../../assets/img/sign/login.png" alt="">
</v-touch>
```

