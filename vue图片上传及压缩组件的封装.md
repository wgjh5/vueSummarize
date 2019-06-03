## vue图片上传及压缩组件的封装

[源码地址](./uploadPictures/uploadPictures.vue)

#### 使用方法：

> 先去上面的链接把组件，复制到自己的`components`文件夹内

##### 1.先下载

````bash
cnpm install compressorjs --save-dev //压缩
````

##### 2.引入组件

````js
<script>
import uploadPictures from "../../components/uploadPictures";
export default {
  components: {
    uploadPictures
  },
},
</script>
````

##### 3.用法

````js
//emitType:自定义方法，接收从后端返回的图片码
//title：名字，身份证上传、银行卡上传，（需要则传、不需要不传）
<uploadPictures :openTitle="{emitType:'idCard',title:$t('m.openingInformation.HKPic')}"/>

//在mounted里面监听后端返回的码
 mounted() {
    this.judgeLogin();
      this.$on('idCard',msg=>{
      console.log(msg)
    })
       this.$on('addressCard',msg=>{
      console.log(msg)
    })
  }
````

