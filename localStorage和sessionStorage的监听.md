#### 1.先在src下新建utils文件夹，新建tools.js，它会抛出一个dispatchEventStroage方法 

````js
export default {
    //localStorage
    dispatchEventStroage() {
        const signSetItem = localStorage.setItem
        localStorage.setItem = function(key, val) {
            let setEvent = new Event('setItemEvent')
            setEvent.key = key
            setEvent.newValue = val
            window.dispatchEvent(setEvent)
            signSetItem.apply(this, arguments)
        }

    },
    //sessionStorage
    dispatchEventStroage_S() {
        const signSetItem = sessionStorage.setItem
        sessionStorage.setItem = function(key, val) {
            let setEvent = new Event('setItemEvent_s')
            setEvent.key = key
            setEvent.newValue = val
            window.dispatchEvent(setEvent)
            signSetItem.apply(this, arguments)
        }

    }
} 
````

#### 2.在main.js里面全局引入，并use，然后调用该dispatchEventStroage方法，以解决setitemEvent不会立即生效的问题 

````js
import Tools from '@/utils/tools'
Vue.use(Tools)
// 为了解决setItemEvent不立即生效，使用事件派发强制更高
Tools.dispatchEventStroage()
Tools.dispatchEventStroage_S()
````

#### 3.然后就可以使用了

> 如果我们在每次发送请求的时候都需要携带token字段，token有时候可以存在localstorage里面，但是当token发生改变时，我们js不知道已经改变，所以就需要用到以上方法了。

````js
const reqHeaders = {
  Accept: 'text/json',
  // 第一次登录之后返回的token，之后每次请求都携带token字段进行验证
  token: localStorage.getItem('token') || ''
}
// window全局监听localStorage的setItem事件以及时更新
window.addEventListener('setItemEvent', function (e) {
  reqHeaders.token = e.newValue
})

````

[参考链接](https://blog.csdn.net/weixin_43869192/article/details/85061248)