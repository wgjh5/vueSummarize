## vue keepAlive移除缓存(代替this.$destroy())

### 需求

> 注册页面有一个，点击去查看协议的入口，此时当客户填写了数据，从协议页面回来之后数据就会清空，所以我选择了用keepAlive，但是用第一种方式发现缓存的始终都是第一次填写的东西，如果用this.$destroy()就再也不能缓存了，所以经过多方探查，用了第二种方案完美解决。

#### router.js

````js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) 
export default new Router({
    routes: [{
            path: '/register',
            name: 'register',
            component: resolve => require(['@/pages/sign/register.vue'], resolve),
            meta: {
                keepAlive: true, // 此组件需要被缓存
            }
        }]
````



#### 1.第一种方案

````js
 beforeRouteLeave(to, from, next) {
    if (to.name === "useAgreement") {
      from.meta.keepAlive = true; //当我们进入到C时开启B的缓存
      next();
    } else {
      from.meta.keepAlive = false;
      this.$destroy()
      next(); //当我们前进的不是C时我们让B页面刷新
    }
  },
````

#### 2.第二种方案：在路由跳转里动态判断移除缓存

使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现`后退时销毁页面缓存`。

````js
   // 使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
    Vue.mixin({
        beforeRouteLeave: function(to, from, next) {
            // 默认是缓存的 在来清除
            // 1.用tag标记控制 判断上下级
            // if (from && from.meta.tag && to.meta.tag && (from.meta.tag-to.meta.tag<1))
            // 2.直接用组件名字来写 不够通用
            // if (from.path == '/docMng' && to.path == '/docMng/docDetail') {
            // 3. 用包含关系来判断 通用
            console.log(to, from)
            if (to.path.indexOf('useAgreement') != -1 && from.name == 'register') {
                from.meta.keepAlive = true;
            } else {
                    // if (from && from.meta.tag && to.meta.tag && (from.meta.tag-to.meta.tag<1)){
                if (this.$vnode && this.$vnode.data.keepAlive && from.name == 'register' && to.path.indexOf('home') != -1) {
                    if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
                        if (this.$vnode.componentOptions) {
                            var key = this.$vnode.key == null ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') : this.$vnode.key
                            var cache = this.$vnode.parent.componentInstance.cache
                            var keys = this.$vnode.parent.componentInstance.keys
                            if (cache[key]) {
                                if (keys.length) {
                                    var index = keys.indexOf(key)
                                    if (index > -1) {
                                        keys.splice(index, 1)
                                    }
                                }
                                delete cache[key]
                            }
                        }
                    }
                    from.meta.keepAlive = true;
                }
                // this.$destroy()
            }
            next()
        }
    })
````

[参考链接1](https://wanyaxing.com/blog/20180724141008.html)

[参考链接2](https://blog.csdn.net/weixin_40425232/article/details/88852125)