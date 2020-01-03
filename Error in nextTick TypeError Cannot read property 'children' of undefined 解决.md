#### Error in nextTick: "TypeError: Cannot read property 'children' of undefined" 解决

> 报错 Error in nextTick: "TypeError: Cannot read property 'children' of undefined"
>
> 解决：加一个判断 if (数据存在)，再执行this.nextTick()方法

````js
  if (this.$refs.child1) {
      this.$nextTick(() => {
          this.$refs.child1.updateOpened();
      });
  }
````

