> VUE.js项目中控制台报错： Uncaught (in promise) NavigationDuplicated解决方法

问题愿意：依赖包中vue-router出现问题（猜测为版本问题）；

解决方法：在项目目录下运行

```bash
 npm i vue-router@3.0 -S
```

这条指令就可以解决了。（更换版本）

或者在main.js中添加以下代码：

```js
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
```

