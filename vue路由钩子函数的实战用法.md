#### —— “导航”表示路由正在发生改变。

> 路由钩子函数有三种：
>
> ​            1：全局钩子： beforeEach、 afterEach
>
> ​            2：单个路由里面的钩子：   beforeEnter、 beforeLeave
>
> ​            3:组件路由：beforeRouteEnter、 beforeRouteUpdate、 beforeRouteLeave

## 一、 全局守卫

> 无论访问哪一个路径，都会触发全局的钩子函数，位置是调用router的方法
>
> router.beforeEach() 进入之前触发
>
> router.afterEach() 进入之后触发

#### 1.router.beforeEach（全局前置守卫） 

##### api：

>  每个守卫方法接收三个参数：
>
> ①**to: Route**: 即将要进入的目标[路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)（to是一个对象，是将要进入的路由对象，可以用**to.path**调用路由对象中的属性）
>
> ②**from: Route**: 当前导航正要离开的路由
>
> ③**next: Function**: 这是一个必须需要调用的方法，执行效果依赖 next 方法的调用参数。
>
> next参数：
>
> ​    **next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是**confirmed** (确认的)。
>
> ​    **next(false)**: **中断当前的导航。**如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按 钮)，那么 URL 地址会重置到 from 路由对应的地址。
>
> ​    **next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在[router-link 的 to prop](https://router.vuejs.org/zh/api/#to)或[router.push](https://router.vuejs.org/zh/api/#router-push)中的选项。
>
> ​    **next(error)**: (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给[router.onError()](https://router.vuejs.org/zh/api/#router-onerror)注册过的回调。
>
> **ps~ : 确保要调用 next 方法，否则钩子就不会被 resolved。**

#####  实战用法：

> beforeEach多用于鉴权，写在`main.js`里面或者`router.js`里面判断当前页面未登录，是否能进入，**此时，我们需要给meta增加一个参数`requireAuth `**,**当它为`true`时就是登录可看**，**为`false`未登录可看**,例子如下

![](.\img\routerbeforeach.png)

![](.\img\beforeach_main.png)

````js
//路由写法
   {
      path: '/threeUs/termsService',
      name: 'termsService',
      component: resolve => require(['@/views/threeUs/termsService'], resolve),
          meta: {
              requireAuth: false//false为不登陆也可看，true为登录才可看
          }
   },

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (localStorage.hasOwnProperty('Token')) { // 判断本地是否存在access_token
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath == '/login') {
        if (localStorage.hasOwnProperty('Token')) {
            next({
                path: from.fullPath
            })
        } else {
            next()
        }
    }
})
````

#### 2.router.beforeResolve (v 2.5.0+)

> 全局解析守卫
>
> 和beforeEach类似，区别是在**导航被确认之前**，同时在所有**组件内守卫和异步路由组件被解析之后**，解析守卫就被调用
> 即在 beforeEach 和 组件内beforeRouteEnter 之后
>
> 参数和beforeEach一致，也需要调用next对导航确认

#### 3.router.afterEach**（全局后置钩子）** 

> 全局后置钩子
> 在所有路由跳转结束的时候调用
> 这些钩子不会接受 next 函数也不会改变导航本身
>
> 一般用法：
>
> 通常是和router.beforeach合起来用，在PC端的`路由加载进度条`，router.beforeach开始,`router.afterEach`结束。

例如：

````js
function configLoadBar() {
    iView.LoadingBar.config({
        color: '#cba060',
    });
}
router.beforeEach((to, from, next) => {
    configLoadBar()
    iView.LoadingBar.start();
    next();
});

router.afterEach(route => {
    configLoadBar()
    iView.LoadingBar.finish();
})
````

#### 4.beforeEnter

> 写在路由配置中，只有访问到这个路径，才能触发钩子函数 ，和beforeEach方法参数、用法相同

````js
routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
````

#### 5.路由组件钩子：

##### 5.1 beforeRouteEnte

- 可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用next并在回调中通过 `vm`访问组件实例进行赋值等操作
- beforeRouteEnter触发在导航确认、组件实例创建之前：beforeCreate之前；而next中函数的调用在mounted之后：为了确保能对组件实例的完整访问

```js
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
      next();
  },

```

##### 5.2 beforeRouteUpdate 

> 在当前路由改变，并且该组件被复用时调用，可以通过this访问实例， **next需要被主动调用，不能传回调**

- 对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，组件实例会被复用，该守卫会被调用
- 当前路由query变更时，该守卫会被调用
- vue-router推荐的数据获取方法二中，结合beforeRouteEnter使用，在路由参数变更时可以重新获取数据，获取成功再调用next()，参考：[https://router.vuejs.org/zh-c...](https://router.vuejs.org/zh-cn/advanced/data-fetching.html)

````js
 beforeRouteUpdate (to, from, next) {

    // 在当前路由改变，但是该组件被复用时调用

    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，

    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。

    // 可以访问组件实例 this
     next();

  },

````

##### 5.3 beforeRouteLeave 

> 这个**离开守卫beforeRouteLeave()**通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。 

````js
  beforeRouteLeave (to, from, next) {

    // 导航离开该组件的对应路由时调用

    // 可以访问组件实例 this
      next();

  }

````

## 总结

结合并扩展Vue-router官方文档的说明：

- **导航行为被触发**，此时导航未被确认。
- 在失活的组件里调用离开守卫 beforeRouteLeave。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件（如果有）。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)，标示解析阶段完成。
- **导航被确认**。
- 调用全局的 afterEach 钩子。
- 非重用组件，开始**组件实例的生命周期**
  - beforeCreate&created
  - beforeMount&mounted
- 触发 DOM 更新。
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
- **导航完成**

[参考链接1](https://www.jianshu.com/p/e8255720eb25)

[参考链接2](https://segmentfault.com/a/1190000013956945)