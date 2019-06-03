<template>
<section>
		<div class="idCard box_block">
					<p>{{openTitle.title}}</p>
					<ul>
						<li>
							<img :src="frontSrc" alt="">
							<div>
							</div>
							<input type="file" ref="inputer" @change="addImg" accept="image/*">
						</li> 
						<!-- <li>
							<img :src="backSrc" alt="">
							<div>
								<p></p>
								<p>身份证背面照片</p>
								<p>（文字清晰，四角齐全）</p>
							</div>
							<input type="file" ref="inputer1" @change="addImg1" accept="image/*">
						</li> -->
					</ul>
				</div>
</section>    
</template>

<script>
import { uploadimg, saveibinfo, isopenaccount } from "@/api";
import Compressor from "compressorjs";
export default {
    props:["openTitle"],
  data() {
    return {
      frontSrc: require("@/assets/img/openInformation/pass.png"), //身份证正面的图片路径
      backSrc: "", //身份证反面的图片路径
      CardFront: "", //身份证正面的图片
      CardBack: "" //身份证反面的图片
    };
  },
  methods: {
    // 添加身份证正面
    addImg() {
      let self = this;
      this.frontSrc = "";
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      const file = inputDOM.files[0];
      if (!file) {
        return;
      }
      new Compressor(file, {
        quality: 0.1,
        success(result) {
          const formData = new FormData();

          // The third parameter is required for server
          formData.append("file", result, result.name);
          let params = formData;
          uploadimg(params).then(r => {
            if (r.data.rst == true) {
              if (r.data.Url.length > 0) {
                self.frontStatus = true;
                self.CardFront = r.data.Url;
                self.frontSrc = self.$axios + "/Img/Show/" + r.data.Url;
                self.$parent.$emit(self.openTitle.emitType,r.data.Url)
              }
            } else {
              self.$vux.toast.text(r.data.Msg, "middle");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/reset.scss";
.idCard {
  height: rem(303);
  padding: rem(10) 0 rem(30) rem(30);
  p {
    text-align: left;
    font-size: rem(24);
    line-height: rem(64);
    color: #fff;
  }
  ul {
    position: relative;
    li {
      width: rem(400);
      height: rem(200);
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: rem(-200);
      img {
        width: 100%;
        height: 100%;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
