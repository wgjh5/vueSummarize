## vue-cookies

#### 1.先安装

````bash
cnpm install vue-cookies --save-dev
````

#### 2.在`main.js`引入

````js
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
````

#### 3.Api

- 设置 cookie：

```js
this.$cookies.set(keyName, time)   //return this
```

- 获取cookie

```js
this.$cookies.get(keyName)       // return value   
```

- 删除 cookie

```js
this.$cookies.remove(keyName)   // return  false or true , warning： next version return this； use isKey(keyname) return true/false,please
```

- 查看一个cookie是否存在（通过`keyName`）

```js
this.$cookies.isKey(keyName)        // return false or true
```

- 获取所有cookie名称

```js
this.$cookies.keys()  // return a array
```

#### 时间格式

| Unit | full name |
| ---- | --------- |
| y    | 年        |
| m    | 月        |
| d    | 天        |
| h    | 小时      |
| min  | 分钟      |
| s    | 秒        |

#### 例如：

````js
this.$cookies.set('key',value, '7d')   //保存七天cookie
````

**Unit Names Ignore Case**

参考链接：<https://www.cnblogs.com/s313139232/p/9341762.html> 

资料来源：https://www.npmjs.com/package/vue-cookies