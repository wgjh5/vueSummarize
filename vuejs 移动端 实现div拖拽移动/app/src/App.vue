<template>
	<div id="app">
		<header>拖拽事件</header>
		<div id="webId">
			<div class="xuanfu" id="moveDiv" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove.prevent="move"
			 @mouseup="end" @touchend="end">

			</div>
			<div @click="shareStatus=!shareStatus" class="share">
				分享
			</div>
			<vue-native-share :shareMenu="shareMenu" :config="config" class="shares" v-if="shareStatus"/>
		</div>
	</div>
</template>

<script>
	import vueNativeShare from 'vue-native-share'
	export default {
		name: 'app',
		components: {
			vueNativeShare
		},
		data() {
			return {
				flags: false,
				shareStatus:false,
				position: {
					x: 0,
					y: 0
				},
				nx: '',
				ny: '',
				dx: '',
				dy: '',
				xPum: '',
				yPum: '',
				// ====
				shareMenu: [0, 1, 2, 3, 4, 5],
				config: {
					title: '分享标题',
					desc: '描述',
					img: '图片地址',
					img_title: '图片标题',
					link: '当前链接',
					success: () => {
						console.log('success')
					}, //成功回调
					cancel: () => {
						console.log('cancel')
					}, //取消回调
				}
			}
		},

		methods: {
			// 实现移动端拖拽
			down() {
				this.flags = true;
				var touch;
				if (event.touches) {
					touch = event.touches[0];
				} else {
					touch = event;
				}
				this.position.x = touch.clientX;
				this.position.y = touch.clientY;
				this.dx = moveDiv.offsetLeft;
				this.dy = moveDiv.offsetTop;
			},
			move() {
				if (this.flags) {
					var touch;
					if (event.touches) {
						touch = event.touches[0];
					} else {
						touch = event;
					}
					this.nx = touch.clientX - this.position.x;
					this.ny = touch.clientY - this.position.y;
					this.xPum = this.dx + this.nx;
					this.yPum = this.dy + this.ny;
					moveDiv.style.left = this.xPum + "px";
					moveDiv.style.top = this.yPum + "px";
					//阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
					document.addEventListener("touchmove", function() {
						event.preventDefault();
					}, false);
				}
			},
			//鼠标释放时候的函数
			end() {
				this.flags = false;
			},
			share() {
				if (navigator.share) {

					try {

						navigator.share({

							title: 'Web Share Test',

							text: 'Some text',

							url: 'https://www.test.com/'

						});

						console.log('Successful share')

					} catch (error) {

						console.log('Error sharing', error)

					}

				} else {
					alert("失败")
				}
			},

		},
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
		background-color: #58bc58;
		width: 100%;
		height: 100%;
	}

	header {
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

	.share {
		width: 4rem;
		height: 4rem;
		margin: 0 auto;
		line-height: 4rem;
		color: #FFFFFF;
		background-color: red;
	}
	#nativeShare{
		position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: #fff;
	}
</style>
