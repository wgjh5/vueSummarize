### promise是什么？

>  1、主要用于异步计算
>  2、可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
>  3、可以在对象之间传递和操作promise，帮助我们处理队列

### 为什么会有promise？

**为了避免界面冻结（任务）**

- 同步：假设你去了一家饭店，找个位置，叫来服务员，这个时候服务员对你说，对不起我是“同步”服务员，我要服务完这张桌子才能招呼你。那桌客人明明已经吃上了，你只是想要个菜单，这么小的动作，服务员却要你等到别人的一个大动作完成之后，才能再来招呼你，这个便是同步的问题：也就是“顺序交付的工作1234，必须按照1234的顺序完成”。
- 异步：则是将耗时很长的A交付的工作交给系统之后，就去继续做B交付的工作，。等到系统完成了前面的工作之后，再通过回调或者事件，继续做A剩下的工作。
   AB工作的完成顺序，和交付他们的时间顺序无关，所以叫“异步”。

 

#### 1.promise简单用法

```js
function2(){
    // 你的逻辑代码 
    return Promise.resolve(/* 这里是需要返回的数据*/)
}

function3(){
    // 你的逻辑代码 
    return Promise.resolve(/* 这里是需要返回的数据*/)
}

// 调用
function1(){
    this.function2().then(val => { 
        this.function3();
    });
}
```

####  2.promise高阶用法

````js
init1(){
return new Promise((resolve, reject) => {
    let data={
        dateStr:this.time
    };
    api.get('url', null).then( res => {
       //自己的操作
        resolve()
    }).catch(err => {
        reject()
    });
});
};
init2(){
return new Promise((resolve, reject) => {
    let data={
        dateStr:this.time
    };
    api.get('url', null).then( res => {
       //自己的操作
        resolve()
    }).catch(err => {
        reject()
    });
});
};


//调用
Promise.all([this.init1(),this.init2()]).then(() => {
    //两个都调成功以后执行的操作
//主要是loading问题
}).catch(err => {
    // 抛出错误信息
});
````

[参考链接1](https://www.jianshu.com/p/1b63a13c2701)

[参考链接2](https://blog.csdn.net/qq_34645412/article/details/81170576)

 