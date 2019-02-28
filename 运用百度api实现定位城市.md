## 运用百度api实现定位城市

#### 1.在index.html中写

```js
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>

```

#### 2.在`lib`里面封装一个`getLocation.js`

```js
let getCurrentCityName = function() {
    return new Promise(function(resolve, reject) {
        let myCity = new BMap.LocalCity()
        myCity.get(function(result) {
            resolve(result.name)
        })
    })
}

export default getCurrentCityName
```

#### 3.在你需要定位的文件里面写

```js
  mounted(){
    getCurrentCityName().then((city)=>{
      this.locations = city;
    })
  }
```

[参考文档](https://www.imooc.com/article/35794?block_id=tuijian_wz)