## vue单页面，多路由，前进刷新，后退不刷新

> 目的：vue-cli构建的vue单页面应用，某些特定的页面，实现前进刷新，后退不刷新，类似app般的用户体验。
>
> 注：　此处的刷新特指当进入此页面时，触发ajax请求，向服务器获取数据。不刷新特指当进入此页面时，不触发ajax请求，而是使用之前缓存的数据，以便减少服务器请求，用户体验更流畅。

#### 1.在app.vue中改写router-view 

````html
<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
    </router-view>
</keep-alive>
 
<router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件 -->
</router-view>
````

#### 2.在router/index.js中添加[路由元信息](https://router.vuejs.org/zh-cn/advanced/meta.html)，设置需要缓存的页面 

````js
routes: [{
        path: '/',
        name: 'index',
        component: index,
        meta: {
            keepAlive: false, //此组件不需要被缓存
        }
    },
    {
        path: '/page1',
        name: 'page1',
        component: page1,
        meta: {
            keepAlive: true, //此组件需要被缓存
            
        }
    },
    {
        path: '/page2',
        name: 'page2',
        component: page2,
        meta: {
              keepAlive: true, // 此组件需要被缓存
              isBack:false, //用于判断上一个页面是哪个
          }

    },
    {
        path: '/page3',
        name: 'page3',
        component: page3,
        meta: {
            keepAlive: false, // 此组件不需要被缓存
        }
    }
]

````

#### 3.beforeRouteEnter中判断是从哪个页面过来的

> 判断是从哪个路由过来的，如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
>

```js
beforeRouteEnter(to, from, next) {
  // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
  // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
  // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
  if(from.name=='page2'){
      to.meta.keepAlive=true;
      //判断是从哪个路由过来的，
      //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
  }
  
  next();
},
```
##### 钩子函数的执行顺序

- 不使用keep-alive


> beforeRouteEnter --> created --> mounted --> destroyed

- 使用keep-alive

> beforeRouteEnter --> created --> mounted --> activated --> deactivated
> 再次进入缓存的页面，只会触发beforeRouteEnter -->activated --> deactivated 。created和mounted不会再执行。我们可以利用不同的钩子函数，做不同的事。务必理解上述钩子函数的执行时机和执行顺序，本教程的核心就依赖于此钩子函数

###### activated和deactivated是使用keep-alive后，vue中比较重要的两个钩子函数，建议详细了解下。

#### 4.activated中执行getData这个获取数据的方法

> 因为这个页面需要缓存。只有第一次进入时才会执行created和mounted方法，再次进入就不执行了。而activated每次进入都执行，所以在这个钩子函数中获取数据。

````js
activated() {
  if(!this.$route.meta.isBack){
    // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
    this.getData();
  }
  // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
  this.$route.meta.isBack=false
 
}

````

[参考链接](https://blog.csdn.net/qq_40963664/article/details/80062130)