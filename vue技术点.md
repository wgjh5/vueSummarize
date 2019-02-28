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

#### 4.在组件中的用法

````js
//跟methods同级 
sockets: {
    connect() {
      this.id = this.$socket.id;
      // this.$socket.emit("sendMessageToServer", "0025520"); //监听connect事件
    },
    servermessage(data) {
      // 监听message事件，方法是后台定义和提供的
      console.log(data);
    }
  },
 methods: {
    // websocket
    clickButton: function(val) {
      //添加按钮事件向服务端发送数据
      this.$socket.emit("sendMessageToServer", val);
    },
   }
````

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
cnpm install vue-touch@next --save dev
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

#### 2.在`lib`里面封装一个`getLocation.js`

````js
let getCurrentCityName = function() {
    return new Promise(function(resolve, reject) {
        let myCity = new BMap.LocalCity()
        myCity.get(function(result) {
            resolve(result.name)
        })
    })
}

export default getCurrentCityName
````

#### 3.在你需要定位的文件里面写

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

## 六、vue中`animate.css`用法

#### 1.先下载

````bash
cnpm install animate.css --save
````

#### 2.引入

````js
import animated from 'animate.css' 
Vue.use(animated)

````

#### 3.用法

````html
  <div v-if="nextStatus==false" ref="statusOne"
       <!--添加类名的方式-->
       class="animated rotateInDownRight">
      <div class="phone_number code_popup">
          <div class="phoneTitle">
              <span>+86</span>
          </div>
          <span>{{phoneNumber}}</span>
 </div>
````

```
fade: {
        title: '淡入淡出',
        fadeIn: '淡入',
        fadeInDown: '向下淡入',
        fadeInDownBig: '向下快速淡入',
        fadeInLeft: '向右淡入',
        fadeInLeftBig: '向右快速淡入',
        fadeInRight: '向左淡入',
        fadeInRightBig: '向左快速淡入',
        fadeInUp: '向上淡入',
        fadeInUpBig: '向上快速淡入',
        fadeOut: '淡出',
        fadeOutDown: '向下淡出',
        fadeOutDownBig: '向下快速淡出',
        fadeOutLeft: '向左淡出',
        fadeOutLeftBig: '向左快速淡出',
        adeOutRight: '向右淡出',
        fadeOutRightBig: '向右快速淡出',
        fadeOutUp: '向上淡出',
        fadeOutUpBig: '向上快速淡出'
      },
      bounce: {
        title: '弹跳类',
        bounceIn: '弹跳进入',
        bounceInDown: '向下弹跳进入',
        bounceInLeft: '向右弹跳进入',
        bounceInRight: '向左弹跳进入',
        bounceInUp: '向上弹跳进入',
        bounceOut: '弹跳退出',
        bounceOutDown: '向下弹跳退出',
        bounceOutLeft: '向左弹跳退出',
        bounceOutRight: '向右弹跳退出',
        bounceOutUp: '向上弹跳退出'
      },
      zoom: {
        title: '缩放类',
        zoomIn: '放大进入',
        zoomInDown: '向下放大进入',
        zoomInLeft: '向右放大进入',
        zoomInRight: '向左放大进入',
        zoomInUp: '向上放大进入',
        zoomOut: '缩小退出',
        zoomOutDown: '向下缩小退出',
        zoomOutLeft: '向左缩小退出',
        zoomOutRight: '向右缩小退出',
        zoomOutUp: '向上缩小退出'
      },
      rotate: {
        title: '旋转类',
        rotateIn: '顺时针旋转进入',
        rotateInDownLeft: '从左往下旋入',
        rotateInDownRight: '从右往下旋入',
        rotateInUpLeft: '从左往上旋入',
        rotateInUpRight: '从右往上旋入',
        rotateOut: '顺时针旋转退出',
        rotateOutDownLeft: '向左下旋出',
        rotateOutDownRight: '向右下旋出',
        rotateOutUpLeft: '向左上旋出',
        rotateOutUpRight: '向右上旋出'
      },
      flip: {
        title: '翻转类',
        flipInX: '水平翻转进入',
        flipInY: '垂直翻转进入',
        flipOutX: '水平翻转退出',
        flipOutY: '垂直翻转退出'
      },
      strong: {
        title: '强调类',
        bounce: '弹跳',
        flash: '闪烁',
        pulse: '脉冲',
        rubberBand: '橡皮筋',
        shake: '左右弱晃动',
        swing: '上下摆动',
        tada: '缩放摆动',
        wobble: '左右强晃动',
        jello: '拉伸抖动'
      }
```

#### fade

|      title      |   淡入淡出   |
| :-------------: | :----------: |
|     fadeIn      |     淡入     |
|   fadeInDown    |   向下淡入   |
|  fadeInDownBig  | 向下快速淡入 |
|   fadeInLeft    |   向右淡入   |
|  fadeInLeftBig  | 向右快速淡入 |
|   fadeInRight   |   向左淡入   |
| fadeInRightBig  | 向左快速淡入 |
|    fadeInUp     |   向上淡入   |
|   fadeInUpBig   | 向上快速淡入 |
|     fadeOut     |     淡出     |
|   fadeOutDown   |   向下淡出   |
| fadeOutDownBig  | 向下快速淡出 |
|   fadeOutLeft   |   向左淡出   |
| fadeOutLeftBig  | 向左快速淡出 |
|   adeOutRight   |   向右淡出   |
| fadeOutRightBig | 向右快速淡出 |
|    fadeOutUp    |   向上淡出   |
|  fadeOutUpBig   | 向上快速淡出 |

#### bounce

|     title      |    弹跳类    |
| :------------: | :----------: |
|    bounceIn    |   弹跳进入   |
|  bounceInDown  | 向下弹跳进入 |
|  bounceInLeft  | 向右弹跳进入 |
| bounceInRight  | 向左弹跳进入 |
|   bounceInUp   | 向上弹跳进入 |
|   bounceOut    |   弹跳退出   |
| bounceOutDown  | 向下弹跳退出 |
| bounceOutLeft  | 向左弹跳退出 |
| bounceOutRight | 向右弹跳退出 |
|  bounceOutUp   | 向上弹跳退出 |

#### zoom

|    title     |    缩放类    |
| :----------: | :----------: |
|    zoomIn    |   放大进入   |
|  zoomInDown  | 向下放大进入 |
|  zoomInLeft  | 向右放大进入 |
| zoomInRight  | 向左放大进入 |
|   zoomInUp   | 向上放大进入 |
|   zoomOut    |   缩小退出   |
| zoomOutDown  | 向下缩小退出 |
| zoomOutLeft  | 向左缩小退出 |
| zoomOutRight | 向右缩小退出 |
|  zoomOutUp   | 向上缩小退出 |

#### rotate

|       title        |     旋转类     |
| :----------------: | :------------: |
|      rotateIn      | 顺时针旋转进入 |
|  rotateInDownLeft  |  从左往下旋入  |
| rotateInDownRight  |  从右往下旋入  |
|   rotateInUpLeft   |  从左往上旋入  |
|  rotateInUpRight   |  从右往上旋入  |
|     rotateOut      | 顺时针旋转退出 |
| rotateOutDownLeft  |   向左下旋出   |
| rotateOutDownRight |   向右下旋出   |
|  rotateOutUpLeft   |   向左上旋出   |
|  rotateOutUpRight  |   向右上旋出   |

#### flip

|  title   |    翻转类    |
| :------: | :----------: |
| flipInX  | 水平翻转进入 |
| flipInY  | 垂直翻转进入 |
| flipOutX | 水平翻转退出 |
| flipOutY | 垂直翻转退出 |

#### strong

|   title    |   强调类   |
| :--------: | :--------: |
|   bounce   |    弹跳    |
|   flash    |    闪烁    |
|   pulse    |    脉冲    |
| rubberBand |   橡皮筋   |
|   shake    | 左右弱晃动 |
|   swing    |  上下摆动  |
|    tada    |  缩放摆动  |
|   wobble   | 左右强晃动 |
|   jello    |  拉伸抖动  |

