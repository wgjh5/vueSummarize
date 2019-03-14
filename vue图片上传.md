#### html

````html
    <div class="idCard">
        <p>信用卡图像</p>
        <ul>
            <li>
                <img :src="frontSrc" alt="">

                <div>
                    <p></p>
                    <p>信用卡正面图像</p>
                    <p>（文字清晰，四角齐全）</p>
                </div>

                <input type="file" ref="inputer" @change="addImg">
                </li>
        </ul>
    </div>
````

#### js

````js
data() {
    return {
      selfname:"",//自定名称
      formDataFront: new FormData(),
      frontStatus: false, //判断是否提交了身份证正面
      imgsFront: {}, //正面
      imgLen: 0,
      frontSrc: "", //身份证正面的图片路径
      creditfront: ""
    };
  },
// 上传银行卡图片
    addImg() {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      // console.log(this.fil)
      let oldLen = this.imgLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        console.log("正面==================", size);
        if (size > 20 * 1024 * 1024) {
          alert("请选择20M以内的图片！");
          return false;
        }
        this.imgLen++;
        this.imgsFront = {};
        this.$set(
          this.imgsFront,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
      }
      for (let key in this.imgsFront) {
        let name = key.split("?")[0];
        this.formDataFront.append("multipartFiles", this.imgsFront[key], name);
      }
      // 上传图片
      // console.log(this)

      let params = this.formDataFront;
      uploadimg(params).then(r => {
        console.log(r.data);
        if (r.data.Url.length > 0) {
          this.frontStatus = true;
          this.creditfront = r.data.Url;	//后端返回需要再次发到后端的东西
          this.frontSrc = this.$axios + "/Img/Show/" + r.data.Url;
        }
      });
    },
````

#### scss

````scss
  .idCard {
    padding: 0 rem(30) rem(30) rem(30);

    p {
      text-align: left;
      font-size: rem(24);
      line-height: rem(84);
    }

    ul {
      display: flex;
      justify-content: space-between;

      li {
        position: relative;
        width: rem(310);
        height: rem(200);
        background-color: #ffffff;
        border: rem(1) dashed #ccc;

        div {
          z-index: 88;

          p:first-child {
            width: rem(46);
            height: rem(46);
            background: url("../../assets/img/mine/+.png") no-repeat;
            background-size: cover;
            margin: rem(40) auto rem(10) auto;
          }

          p:nth-child(2) {
            font-size: rem(26);
            line-height: rem(30);
            text-align: center;
            color: #999999;
          }

          p:nth-child(3) {
            font-size: rem(20);
            text-align: center;
            color: #bbbbbb;
            line-height: rem(40);
          }
        }

        img {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }

        input {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10000;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
````

