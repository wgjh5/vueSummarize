#### 方案一：: XMLHTTP方案

````js
 function getURL(url) {
        var xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP");
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        if(xmlhttp.readyState==4) {
            if(xmlhttp.Status != 200) alert("不存在");
            return xmlhttp.Status==200;
        }
        return false;
}
````

#### 方案二：正则方案

````js
 function jugeUrl(URL) {
            var str = URL;
            //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
            //下面的代码中应用了转义字符"\"输出一个字符"/"
            var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
            var objExp = new RegExp(Expression);
            if (objExp.test(str) == true) {
                return true;
            } else {
                return false;
            }
        },
````

