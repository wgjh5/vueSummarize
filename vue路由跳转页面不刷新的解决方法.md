#### 解决vue路由跳转页面不刷新的问题

> 通过路由传参跳转界面，页面没有刷新
>
> 解决方法：在 router-view 中加 :key="$route.fullPath"
>

```js
<router-view :key="$route.fullPath"></router-view>
```

