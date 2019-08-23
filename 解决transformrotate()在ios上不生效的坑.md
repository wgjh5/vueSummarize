> 问题：今天使用css3的rotate做旋转动画，在浏览器里面调试没问题，自己手机上也测试了一番（都没有问题，让ui访问我的地址看一下满意不，结果发现在ios手机上显示不出来

猜想：rotate存在兼容问题？

测试：查了一下资料，给@keyframes和transform增加上-webkit-前缀来做兼容

结果：ios手机还是毫无效果。。

继续猜想：查一下资料，猜测是不是视角的问题？

测试：在旋转的父元素上面增加transform: perspective(1000);（想了解perspective属性请看http://www.w3school.com.cn/cssref/pr_perspective.asp）

结果：ios手机上元素出现并且开始旋转了，问题解决

#### 解决方案：

````js
父元素：transform: perspective(1000);
子元素：transform: transform:rotate();

兼容性写法：
	transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);

````

[参考链接](https://blog.csdn.net/THINK_OF_/article/details/81274683)