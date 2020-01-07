#### [效果预览](https://wgjh5.github.io/vueSummarize/vue%E5%AE%9E%E7%8E%B03D%E7%BF%BB%E4%B9%A6%E6%95%88%E6%9E%9C/turningpage/dist/#/)

##### 基础知识储备

> -transform:CSS3新增的变形功能，其优点是全过程不改变DOM性能更高。在transform下有如下几个变形样式：
>  1）.translate()   ---  位置改变(平移)
>  2）.scale()   ---   缩放比例
>  3）rotate()   ---   旋转角度
>  4）skew()  ---   倾斜(斜切)
>  以上的几个形式都支持X轴、Y轴、Z轴的变换方向。
>  但需要注意：
>  1）要使用3D变换，需要在其父级开启3D空间：transform-style: preserve-3d;
>  2）在变形过程中，会出现“抖动”效果，这时我们需要在该元素的该变形属性加初始值：transform:rotateY(0deg);
>  3）要想查看到超炫的3D效果还要设置下景深/透视，transform:perspective(800px) ;这个可以都当前元素加或给其元素父级加
>  -当设置transform:rotate(30deg);旋转角度时可指定其旋转的奇点。transform-origin: x坐标 y坐标;

###### 原理级思路

> 核心思想，这个展示区分为左右两部分。

####  html布局如下：

```jsx
<template>
	<!-- /* box为整个页面展示区 */ -->
		<div id="box" >
			<!-- /* page有前后两面 */ -->
			<div class="page" @click="togoleRegister(true)">
				<div class="front"></div>
				<div class="back"></div>
			</div>
			<!-- /* page2为翻页之后显示的*/ -->
			<div class="page2" @click="togoleRegister(false)"></div>
		</div>
</template>
```

1.当未翻页前，页面展示如下图：

![img](https:////upload-images.jianshu.io/upload_images/3868852-5b18d4b111704365.png?imageMogr2/auto-orient/strip|imageView2/2/w/482/format/webp)



> 整个展示区(box)分为左右两个部分，这里我们给box一个背景图(0.png);然后再给page-front（正面）一个相同背景图(0.png),并把front定在展示区的右侧。其实我们看到的一张图是由两个相同（但大小原图为一半）的图组成。 

2.当未翻页前，页面展示如下图：



![img](https:////upload-images.jianshu.io/upload_images/3868852-fd843dfb5f1c33a2.png?imageMogr2/auto-orient/strip|imageView2/2/w/472/format/webp)



> 当翻页后，整个展示区依然为两部分，左部分为page-back(背面，背景图(1.png))，右部分为page2背景图(1.png)。
>  需要注意的一点就是，当page-front进行翻页的旋转奇点为左边。

#### css布局代码如下：

```css
/* 将页面展示区box设置宽高背景 */
	#box {
		background: url("../assets/0.png") no-repeat;
		width: 700px;
		height: 400px;
		/* 此处是为了让Box在中间显示 */
		margin: 100px auto;
		position: relative;
	}

	/* 设定page的位置 */
	#box .page {
		/* 因为其在展示区右侧，所以宽度为整个box的一般，并定在右侧 */
		width: 50%;
		height: 100%;
		top: 0;
		right: 0;
		position: absolute;
		/* 将开启3d空间，方便翻页后front和back的3d变换 */
		transform-style: preserve-3d;
		/* 奇点设为左边 */
		transform-origin: left center;
		/* 设置翻书（旋转）的运动时间，运动形式 */
		transition: 1s all ease;
		/* 提升层级否则会被盖住 */
		z-index: 2;
		/* 设置景深来更好的展示3D效果，并给旋转角度一个初始值，防止抖动发生 */
		transform: perspective(800px) rotateY(0deg);
	}

	/* 配置旋转页的前页 */
	.page .front {
		/* 宽高与父级page一样 */
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		/* 将背景设成为与前一页相同的背景,并且只要右面的那部分，与页面左部分拼接 */
		background: url("../assets/0.png") right top no-repeat;
		/* backface-visibility属性和3D transform效果相关，它决定当一个元素的背面面是否可见 */
		backface-visibility: hidden;
		/* 提升层级否则会被盖住 */
		z-index: 2;
	}

	/* 配置旋转页的后页 */
	.page .back {
		/* 宽高与父级page一样 */
		width: 100%;
		height: 100%;
		/* 将背景设成为与下一页相同的背景,并且只要左面的那部分，与右部分的page2拼接 */
		background: url("../assets/1.png") left top no-repeat;
		position: absolute;
		left: 0;
		top: 0;
		/* 这里设置将back进行水平方向上的镜像变化，因为当page旋转180°后， back显示的效果不对*/
		transform: scale(-1, 1);
		/* 改变层级避免盖住其他页面 */
		z-index: 1;
	}

	/* 配置pages展示区 */
	#box .page2 {
		/* 因为其只在页面右侧展示所以宽为Box的一半 */
		width: 50%;
		height: 100%;
		top: 0;
		right: 0;
		position: absolute;
		/* 将背景设成为与下一页相同的背景,并且只要右面的那部分，与左部分（.page .back）拼接 */
		background: url("../assets/1.png") right top no-repeat;
			/* 改变层级避免盖住其他页面 */
			z-index:1;
	}
	  #box:before {
	        content: "";
	        position: absolute;
	        top: 0%;
	        right: 0%;
	        width: 0px;
	        height: 0px;
	        background-color: #fff;
	        background: linear-gradient(225deg, #ffffffD1 45%, #d2d2d2 50%, #cacaca 56%, #ffffffd9 80%);
	        -webkit-box-shadow: -1px 1px 1px #f0f0f0;
	        box-shadow: 3px 7px 15px #d8d8d8;
	        -webkit-transition-duration: 0.3s;
	        transition-duration: 0.3s;
	        -webkit-transition-property: width, height;
	        transition-property: width, height;
	        z-index: 20;
	    }
	    #box:hover:before {
	        width: 100px;
	        height: 100px;
	    }
```

> 下面我们通过js来控制page进行翻页(沿着Y轴反向旋转180°)就可以了

####  js代码如下：

```jsx
  togoleRegister(val) {
		            var oBox = document.getElementById('box');
		            var oPage = document.querySelector('.page');
		            console.log("oPage.style", oPage.style)
		            if (val == true) {
		                oPage.style.WebkitTransform = 'perspective(1600px) rotateY(-180deg)';
		                // oPage.style.opacity = '0'
		            } else {
		                oPage.style.WebkitTransform = 'perspective(1600px) rotateY(0)';
		                // oPage.style.opacity = '1'
		
		            }
		        },
```

