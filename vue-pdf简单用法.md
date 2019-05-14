## vue-pdf

#### 1.先下载

````bash
cnpm install vue-pdf --save-dev
````

#### 2.在局部引入,使用

````vue
<template>
  <pdf src="./static/relativity.pdf"></pdf>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  }
}
</script>
````

#### 例子：可实现放大缩小，翻页功能

````vue
<template>
	<div class="all">
		<!-- <Mheader status="useAgreement" class="head" /> -->
		<header>
			<router-link to="/main/mine" slot="left" class="sprites_all sprites_back"></router-link>
			<div class="newbankCard">
				<span class="sprites_all sprites_back" @click="goBack"></span>
				<span class="pf_thick">{{clauseTitle}}</span>
			</div>
		</header>
		<div class="main">
			<!-- {{currentPage}} / {{pageCount}} -->
			<pdf :src="src" :page="currentPage" @progress="loadedRatio = $event" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler" ref="wrapper" class="pdf"></pdf>
			<!-- <button @click="changePdfPage(1)">+</button> -->
		</div>
		<ul class="footers">
			<li :class="{select:idx==0}" @touchstart="idx=0" @touchend="idx=-1" @click="scaleD">
				<p>放大</p>
			</li>
			<li :class="{select:idx==1}" @touchstart="idx=1" @touchend="idx=-1" @click="scaleX">
				<p>缩小</p>
			</li>
			<li :class="{select:idx==2}" @touchstart="idx=2" @touchend="idx=-1" @click="changePdfPage(0)">
				<p>上一页</p>
			</li>
			<li :class="{select:idx==3}" @touchstart="idx=3" @touchend="idx=-1" @click="changePdfPage(1)">
				<p>下一页</p>
			</li>
		</ul>

	</div>
</template>

<script>
	import pdf from "vue-pdf";
	import Mheader from "../Mheader";
	export default {
		components: {
			pdf,
			Mheader
		},
		data() {
			return {
				currentPage: 1,
				pageCount: 0,
				src: "", // pdf文件地址
				scale: 100, //放大系数
				idx: -1,
				clauseTitle: "",
				loadedRatio: 0
			};
		},
		created() {
			// 有时PDF文件地址会出现跨域的情况,这里最好处理一下
			let clause = this.$route.query.clause + "";
			switch(clause) {
				case "0":
					this.src = "../../../../static/clause/A1.pdf";
					this.clauseTitle = "使用者协定";
					break;
				case "1":
					this.src = "../../../../static/clause/A2.pdf";
					this.clauseTitle = "私隐政策声明";
					break;
				case "2":
					this.src = "../../../../static/clause/C1.pdf";
					this.clauseTitle = "产品披露及风险声明";
					break;
				case "3":
					this.src = "../../../../static/clause/C2.pdf";
					this.clauseTitle = "反洗钱及反恐融资声明";
					break;
				case "4":
					this.src = "../../../../static/clause/C3.pdf";
					this.clauseTitle = "私隐政策声明";
					break;
				case "5":
					this.src = "../../../../static/clause/C4.pdf";
					this.clauseTitle = "客户协议";
					break;
				case "6":
					this.src = "../../../../static/clause/C5.pdf";
					this.clauseTitle = "使用者协定";
					break;
				case "7":
					this.src = "";
					this.clauseTitle = "积分计划";
					break;
				default:
					this.src = "../../../../static/clause/A1.pdf";
			}
			// this.src = pdf.createLoadingTask(this.src);
		},
		methods: {
			// 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
			changePdfPage(val) {
				if(val === 0 && this.currentPage > 1) {
					this.currentPage--;
				}
				if(val === 1 && this.currentPage < this.pageCount) {
					this.currentPage++;
				}
			},
			goBack() {
				this.$router.go(-1);
			},
			// pdf加载时
			loadPdfHandler(e) {
				this.currentPage = 1; // 加载的时候先加载第一页
			},
			//放大
			scaleD() {
				this.scale += 5;
				// this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
				this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
			},

			//缩小
			scaleX() {
				if(this.scale == 100) {
					return;
				}
				this.scale += -5;
				this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
				// this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
			}
		},
		mounted() {}
	};
</script>
<style lang="scss" scoped>
	@import "../../../assets/css/reset.scss";
	.all {
		padding: 0 0 rem(80);
		header {
			height: rem(88);
			position: sticky;
			top: 0;
			background-color: #fff;
			width: 100%;
			z-index: 400;
			.sprites_all {
				position: absolute;
				left: rem(30);
				top: rem(24);
				display: inline-block;
				width: rem(40);
				height: rem(40);
				background: url("../../../assets/img/transaction/transaction_icon.png") no-repeat;
				background-size: rem(400);
				vertical-align: bottom;
				background-position: 0 rem(-50);
			}
			.sprites_back {
				background-position: rem(-50) 0;
			}
			span {
				line-height: rem(86);
				font-size: rem(30);
				color: $text_3;
				// font-weight: bold;
			}
			border-bottom: 1px solid $line_color;
			.newbankCard {
				border-bottom: 1px solid $line_color;
			}
		}
		.main {
			overflow: auto;
		}
		.head {
			position: fixed;
			top: 0;
			height: rem(88);
		}
		.footers {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: rem(100);
			display: flex;
			z-index: 100;
			color: #333;
			border-top: 1px solid #f0f0f0;
			line-height: rem(80);
			background-color: #fff;
			li {
				text-align: center;
				flex: 1;
				padding: rem(10) 0;
				p {
					border-right: 1px solid #f0f0f0;
				}
			}
			li:last-child {
				p {
					border-right: 0 none;
				}
			}
			.select {
				color: #fff;
				background-color: #c59c5a;
				p {
					border-right: 0 none;
				}
			}
		}
	}
</style>
````

参考链接：https://www.npmjs.com/package/vue-pdf