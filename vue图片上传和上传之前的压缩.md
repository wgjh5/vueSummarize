## vue上传图片与压缩

> 这其中我一共用了两种做法，推荐`第一种`，因为第二种在有的苹果手机兼容性不是很好，有时会出现网页奔溃现象

## 一、compressorjs 方式

#### 1.先下载`compressorjs `

````bash
cnpm install compressorjs --save-dev
````

#### 2.引入

````bash
import Compressor from 'compressorjs';
````

#### 3.用法例子

##### template 

````html
<template>
    <input type="file" ref="inputer" @change="addImg" accept="image/*">
 </template>  
````

##### js

````js
// 添加身份证正面
addImg() {
    let self = this;
    let inputDOM = this.$refs.inputer;
    // 通过DOM取文件数据
    const file = inputDOM.files[0];
    //如果file为空return出去
    if (!file) {
        return;
    }
    new Compressor(file, {
        quality: 0.1,//压缩质量
        success(result) {
            const formData = new FormData();
            // The third parameter is required for server
            formData.append('file', result, result.name);
       //上传图片
            let params = formData;
            uploadimg(params).then(r => {
				
            });
        }
    });
}
````

[compressorjs 参考链接](https://www.npmjs.com/package/compressorjs)

## 二、image-compressor方式

#### 1.先下载

````bash
cnpm install image-compressor.js --save-dev
````

#### 2.再引入

````bash
import ImageCompressor from 'image-compressor.js
````

#### 3.用法例子

##### template

````
<template>
    <input type="file" ref="inputer" @change="addImg" accept="image/*">
 </template>  
````

##### js

````js
// 添加身份证正面
addImg() {
    let self = this;
    let inputDOM = this.$refs.inputer;
	const file = inputDOM.files[0];
    if (!file) {
        return;
    }
    new ImageCompressor(file, {
        quality: .6,//压缩质量
        success(result) {
            const formData = new FormData();
            formData.append('file', result, result.name);
            let params = formData;
            uploadimg(params).then(r => {

            });
        }
    });
}
````

[image-compressor参考链接](https://www.jianshu.com/p/3ce3e3865ae2)