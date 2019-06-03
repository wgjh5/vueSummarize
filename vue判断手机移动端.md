## vue判断手机移动端

````js
//App.vue，判断是否为移动端
_isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	 return flag;
}

````

````js
//App.vue
mounted() {
    if (this._isMobile()) {
      alert("手机端");
      this.$router.replace('/m_index');
    } else {
      alert("pc端");
      this.$router.replace('/pc_index');
    }
  }
````

参考链接：<https://blog.csdn.net/qq_24744451/article/details/88538398> 