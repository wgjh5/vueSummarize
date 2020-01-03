````css
input:-webkit-autofill {
    -webkit-text-fill-color: #acfff2 !important;/*浏览器记住密码的字的颜色*/
    transition: background-color 5000s ease-in-out 0s;/*通过延时渲染背景色变相去除背景颜色*/
    caret-color: #acfff2;/*光标颜色*/
}

input:focus { outline: none; }/*外边框线去除*/
````

[参考链接1](https://blog.csdn.net/qq_41253612/article/details/86299602)

[参考链接2](https://segmentfault.com/a/1190000013381998)