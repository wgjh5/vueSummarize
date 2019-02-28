## vue中v-touch事件用法

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

