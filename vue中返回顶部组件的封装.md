> 其实，返回顶部组件在大多数UI都有，为什么会在这里进行自己封装呢？因为我这里有一个需求，就是子组件内部自己的滚动条(不是window的)，要与外层返回顶部不重复，所以就有了以下封装。

#### 用法：

````html
  <div class="main" ref="main">
     <!--直接传入有滚动条的组件的ref,如果正常用则不用传参数-->
        <backTop parent="main" />
    </div>

````

##### 源码：

````vue
<template>
<div class="back_top" @click="backTop" v-if="btnFlag">
   <i>返回顶部</i>
</div>
</template>

<script>
export default {
    props: ["parent"],
    data() {
        return {
            btnFlag: false,
            timer: null,
            scrollTop: 0,
        }
    },

    methods: {
        // 点击图片回到顶部方法，加计时器是为了过渡顺滑
        backTop() {
            const that = this
            this.timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
  				if(this.parent){
                   this.$parent.$refs[that.parent].scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                }else{
				   document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                }
                if (that.scrollTop === 0) {
                    clearInterval(this.timer)
                }
            }, 16)
        },

        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop() {
            const that = this
            let scrollTop = "";
            if(this.parent){
              scrollTop = this.$parent.$refs[that.parent].scrollTop 
                }else{
              scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                }
            
            that.scrollTop = scrollTop
            if (that.scrollTop > 60) {
                that.btnFlag = true
            } else {
                that.btnFlag = false
            }
        }
    },
    // vue的两个生命钩子，这里不多解释。
    // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
    mounted() {
        window.addEventListener('scroll', this.scrollToTop, true)
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollToTop,true)
    },
}
</script>

<style lang="scss" scoped>
.back_top {
    z-index: 9999;
    position: absolute;
    bottom: 120px;
    right: 30px;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    transition: all .2s ease-in-out;
    line-height: 50px;
    opacity: 0.8;

    i {
        color: #fff;
        font-size: 24px;
        padding: 8px 12px;
        font-weight: bold;
    }
}

.back_top:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, .7);
}
</style>

````

[参考链接](https://blog.csdn.net/qq_36070288/article/details/84765139)