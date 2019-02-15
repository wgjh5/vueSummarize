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

## 四、运用百度api实现定位城市

#### 1.在index.html中写

```js
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>

```

#### 2.在你需要定位的文件里面写

```js
  mounted(){
    getCurrentCityName().then((city)=>{
      this.locations = city;
    })
  }
```

[参考文档](https://www.imooc.com/article/35794?block_id=tuijian_wz)

## 五、swiper用法

#### 1.先下载

```bash
cnpm install swiper --save-dev
```

#### 2.结构

```html
<div class="swiper-container">
   <div class="swiper-wrapper">
     <div class="swiper-slide">
         <img src="../../assets/img/mine/shopDetail.png" alt=""></div>
     <div class="swiper-slide">
         <img src="../../assets/img/mine/shopDetail2.png" alt=""></div>
     <div class="swiper-slide">
         <img src="../../assets/img/mine/shopDetail3.png" alt=""></div>
    </div>
                    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

</div>
```

#### 3.js

```js
//普通水平滑动轮播 
swiper() {
      var mySwiper = new Swiper(".swiper-container", {
        speed: 500,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          clickableClass: "my-pagination-clickable"
        }
      });
    },
//3d手动轮播
  swiper() {
      var mySwiper = new Swiper(".swiper-container", {
        speed: 500,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          clickableClass: "my-pagination-clickable"
        }
      });
    },
```

#### 4.样式

> 备注：样式需另起一个style写，不能用scoped锁住，只有这样才能覆盖`swipe`r的样式，
>
> 切记要引入`swiper`的自带样式，去`nodemodules`里面找

```css
//分页器样式
<style lang="scss">
@import "../../assets/css/reset.scss";
@import "../../assets/css/swiper.min.css";
.swiper-container .swiper-pagination {
  width: 100%;
  height: rem(200);
  opacity: 1;
  z-index: 100000;
  padding-left: rem(315);
  position: absolute;
  left: rem(380);
  top: rem(306);

  span {
    display: block;
    width: rem(12);
    height: rem(12);
    background-color: #fff;
    opacity: 1;
    float: left;
    margin-right: rem(20);
    z-index: 100000;
    border-radius: 50%;
  }

  .swiper-pagination-bullet-active {
    width: rem(22);
    height: rem(9);
    background-color: #e4bc7c;
    border-radius: rem(5);
    z-index: 100000;
  }
}
</style>

```

