## 解决Vuex持久化插件-在F5刷新页面后数据不见的问题

> vuex优势：相比sessionStorage，存储数据更安全，sessionStorage可以在控制台被看到。
>
> vuex劣势：在F5刷新页面后，vuex会重新更新state，所以，存储的数据会丢失。
>
> 为了克服这个问题， vuex-persistedstate出现了~~

**使用方法：** 

#### 1.安装

````bash
cnpm install vuex-persistedstate  --save-dev
````

#### 2. 在store下的`index.js`中 引入配置

````js
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState()]
})
````

#### 3.想要存储到sessionStorage，配置如下：

```js
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState({
      storage: window.sessionStorage
  })]
})
```

>  想使用cookie或localStorage同理

#### 4.vuex-persistedstate默认持久化所有state，指定需要持久化的state,配置如下：

> 例如，你state中的user想要持久化，就写如下函数

```js
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
          return {
          // 只储存state中的user
          user: val.user
        }
     }
  })]
```

参考链接：<https://www.cnblogs.com/lemoncool/p/9645587.html> 