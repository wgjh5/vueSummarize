#### vue 移动端 实现div拖拽移动 

> 相关知识点
> touchstart 当在屏幕上按下手指时触发
>
> touchmove 当在屏幕上移动手指时触发
>
> touchend 当在屏幕上抬起手指时触发 
> mousedown mousemove mouseup对应的是PC端的事件
>
> touchcancel 当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的touch操作，即触发touchcancel。一般会在touchcancel时暂停游戏、存档等操作。
>

#### html

````html
<template>
    <div id="webId">
        <div>你的web页面</div>
        <!-- 如果碰到滑动问题，1.1 请检查这里是否属于同一点。 -->
        <!-- 悬浮的HTML -->
        <div v-if="!isShow" class="xuanfu" id="moveDiv"
          @mousedown="down" @touchstart="down"
             //..prevent 防止滑动时，页面也跟着滑动
          @mousemove="move" @touchmove.prevent="move"	
          @mouseup="end" @touchend="end"
        >
          <div class="yuanqiu">
            {{pageInfo.totalPage}}
          </div>
    </div>
  </div>

````

#### js

````js
<script>
data() {
  return {
    flags: false,
    position: { x: 0, y: 0 },
    nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
  }
}

methods: {
  // 实现移动端拖拽
  down(){
    this.flags = true;
    var touch;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    this.position.x = touch.clientX;
    this.position.y = touch.clientY;
    this.dx = moveDiv.offsetLeft;
    this.dy = moveDiv.offsetTop;
  },
  move(){
    if(this.flags){
      var touch ;
      if(event.touches){
          touch = event.touches[0];
      }else {
          touch = event;
      }
      this.nx = touch.clientX - this.position.x;
      this.ny = touch.clientY - this.position.y;
      this.xPum = this.dx+this.nx;
      this.yPum = this.dy+this.ny;
      moveDiv.style.left = this.xPum+"px";
      moveDiv.style.top = this.yPum +"px";
      //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
      document.addEventListener("touchmove",function(){
          event.preventDefault();
      },false);
    }
  },
//鼠标释放时候的函数
  end(){
    this.flags = false;
  },
}
</script>

````

#### css

````css
<style>
  .xuanfu {
    height: 4.5rem;
    width: 4.5rem;
    /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
    z-index: 999;
    position: fixed;
    top: 4.2rem;
    right: 3.2rem;
    border-radius: 0.8rem;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .yuanqiu {
    height: 2.7rem;
    width: 2.7rem;
    border: 0.3rem solid rgba(140, 136, 136, 0.5);
    margin: 0.65rem auto;
    color: #000000;
    font-size: 1.6rem;
    line-height: 2.7rem;
    text-align: center;
    border-radius: 100%;
    background-color: #ffffff;
  }
</style>

````

