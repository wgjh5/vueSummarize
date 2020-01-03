### 解决方案：

#### 1. 使用a标签替代

> 给出如下函数，将此函数绑定到click的事件回调中，就可以避免大部分浏览器对窗口弹出的拦截。

````js
 newLink(url) {
     let a = document.createElement(‘a‘);
     a.setAttribute(‘href‘, url);
     a.setAttribute(‘target‘, ‘_blank‘);
  }
````

#### 2. 使用form的submit方法打开一个页面

> 这种方法需要构造一个from，然后由js代码触发form的submit，将表单提交到一个新的页面，
>
> 如果需要传递参数时，需要使用 **POST** 方法， 默认的 **GET** 方法无法传递参数。也就是新页面的url中没有参数部分。如：

````JS
newLink(url){
    let form = document.createElement('form');
    form.action = 'www.baidu.com?id=1';
    form.target = '_blank';
    form.method = 'POST';
    document.body.appendChild(form);
    form.submit();
}
````

#### 3、终极解决方案–先弹出窗口，然后重定向

> 第三种方案，其实是一种变通方案，核心思想是:**先通过用户点击打开页面，然后再对页面进行重定向**。示例代码如下：

```js
newLink(url){
     // 打开页面，此处最好使用提示页面
    let newLink = window.open(‘loading page‘);
    axios.get(url)
        .then(function (response) {
        newLink.location.href = url;;
    })
        .catch(function (error) {
        console.log(error);
    })
}
```
[参考链接1](https://blog.csdn.net/yypsober/article/details/79487217)

[参考链接2](https://blog.csdn.net/u011159417/article/details/53692536)