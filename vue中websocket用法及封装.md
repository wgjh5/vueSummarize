## vue中websocket用法及封装

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

```js
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
```

