#### 1.普通input版

````html
//js
<input v-on:keyup.13="submit">
//vue
<input @keyup.enter="submit">
````

#### 2.如果按钮不是input的时候

> 如果按钮不是input,可以直接绑定在document上即可

````js
   created() {
        var _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if (key == 13) {
                _this.login();
            }
        };

    },
````

[参考链接1](https://www.cnblogs.com/cristina-guan/p/9440035.html)

[参考链接2](https://blog.csdn.net/weixin_43023873/article/details/91449176)