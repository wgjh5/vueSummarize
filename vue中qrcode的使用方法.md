#### 1.先下载

````bash
npm install qrcode --save-dev	
````

#### 2.引入

````js
import QRCode from "qrcode"; //引入生成二维码插件
````

#### 3.生成二维码

````vue
<template>
	<canvas id="QRCode_header"></canvas>
</template>	

<script>
    import QRCode from "qrcode"; //引入生成二维码插件
    export default {
        data(){
            return{
				this.QRCodeMsg：""
            }
        }
        getQRCode() {
                let opts = {
                    errorCorrectionLevel: "H",//容错级别
                    type: "image/png",//生成的二维码类型
                    quality: 0.3,//二维码质量
                    margin: 12,//二维码留白边距
                    width: 200,//宽
                    height: 180,//高
                    text: "http://www.xxx.com",//二维码内容
                    color: {
                        dark: "#333333",//前景色
                        light: "#fff"//背景色
                    }
                };
                this.QRCodeMsg = "http://www.baidu.com"; //生成的二维码为URL地址js
                let msg = document.getElementById("QRCode_header");
                // 将获取到的数据（val）画到msg（canvas）上
                QRCode.toCanvas(msg, this.QRCodeMsg, opts, function (error) {
                    conso.log(error)
                });
            },
    }
</script>
````

#### api

| width        | 图像宽度                                      |
| ------------ | --------------------------------------------- |
| height       | 图像高度                                      |
| colorDark    | 前景色                                        |
| colorLight   | 背景色                                        |
| correctLevel | QRCode.CorrectLevel.L    容错级别，可设置为： |
|              | QRCode.CorrectLevel.L                         |
|              | QRCode.CorrectLevel.M                         |
|              | QRCode.CorrectLevel.Q                         |
|              | QRCode.CorrectLevel.H                         |

[参考链接](https://www.npmjs.com/package/qrcode)

[vue-qr](https://blog.csdn.net/fifteen718/article/details/85850511)