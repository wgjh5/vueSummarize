##### 上一篇：[vuex刷新数据消失不见解决方案](https://www.jianshu.com/p/7fb432e7594e)

## Vuex模块化

模块化后的 store 大概长这样,**如果画的不对,欢迎留言**

![img](https://img2018.cnblogs.com/blog/1496926/201908/1496926-20190828202329005-520612227.png)

**这样经过模块化的vuex,每个模块维护着不同组件的数据,清晰直观**

### 编码实现

创建store文件夹, 创建index.js 作为vuex的入口js

![](.\img\vuex.png)

```js
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import login from "./modules/login";
import loginOther from "./modules/loginOther";

Vue.use(Vuex);


export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                // 需要储存的数据
                login: val.login,
               
            }
        }
    })],
    modules: {
        login,
        loginOther,//带有Other的是不需要刷新保存数据的，不带的是需要刷新保存的
    },
})
```

> 创建vuex的子模块, login.js , 编码如下: **注意点就是要开启命令空间模式, `namespaced=true` , 因为现在的store被划分成了多模块,每一个模块都有自己的state,所有在mapXXX使用时,需要指定使用的是哪个模块下的state，如果是false就跟平常vuex用法一样，我这里用的是`namespaced=false`**
>
> #### 注意：`login.js`和`loginOther.js`里面的写法是一样的，不无不同。

```js
const state = {
    openObj: { openStatus: false, path: "" }, //是否开户弹窗
    userSrc: "", //头像
}

// getters
const getters = {
    // 是否开户
    getOpenObj: state => {
        return state.openObj
    },
    getuserSrc: state => {
        return state.userSrc
    },
}

// actions
const actions = {
    setOpenObj(conText, data) {
        conText.commit('setOpenObj', data);
    },
    setuserSrc(conText, data) {
        conText.commit('setuserSrc', data);
    },
}

// mutations
const mutations = {
    // 是否开户
    setOpenObj(state, data) {
        state.openObj = data
    },
    setuserSrc(state, data) {
        state.userSrc = data
    },
}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations
}
```

#### 触发方法(actions)：

````js
//namespaced=true
this.$store.dispatch("login/setuserSrc",data)
或
 import {mapActions} from "vuex";
   ...mapActions('login', [
        'setuserSrc',
 ]),
 this.setuserSrc(data)

//namespaced=false
this.$store.dispatch("setuserSrc",data)
或
 import {mapActions} from "vuex";
 ...mapActions(['setuserSrc']),
 this.setuserSrc(data)
````

#### 获取方法(getters):

```js
//namespaced=true
 import {mapGetters} from "vuex";
computed: {
    ...mapGetters('login', [
        'getuserSrc',
 ]),
}
 或
 this.$store.getters.login.getuserSrc
    //namespaced=false
   this.$store.getters.getuserSrc
   import {mapGetters} from "vuex";
    ...mapGetters(['setuserSrc']),
    console.log(this.getuserSrc())
```

