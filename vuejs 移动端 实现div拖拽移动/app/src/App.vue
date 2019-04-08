<template>
  <div id="app">
		<header>拖拽事件</header>
    <div id="webId">
        <div  class="xuanfu" id="moveDiv"
          @mousedown="down" @touchstart="down"
          @mousemove="move" @touchmove.prevent="move" 
          @mouseup="end" @touchend="end"
        >
        
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },
  data() {
  return {
    flags: false,
    position: { x: 0, y: 0 },
    nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
  }
},

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
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color:#58bc58;
  width:100%;
  height:100%;
}
header{
	width: 100%;
	height: 3.75rem;
	position: absolute;
	left: 0;
	top: 0;
	line-height: 3.75rem;
	font-size: 18px;
}
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
