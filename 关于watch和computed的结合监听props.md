## 需求

> 如果你要根据`props`传过来的值，来执行函数，你就需要监听，`props`传过来的值的变化

````vue
<template>
     <div class="logo" ref="logo">
        <img :src="src" alt="">
        <p v-if="status==true">注册成为英皇宝代理</p>
    </div>
</template> 
<script>
export default {
  props: ["status"],
  data() {
    return {
      src: require("@/assets/img/sign/logo.png")
    };
  },
   //计算传过来的属性
  computed: {
    isShow() {
      return this.status;
    }
  },
  watch: {
    isShow: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        console.log(newV, oldV);
          //根据属性变化改变样式
        if (newV == true) {
          this.$refs.logo.classList.add("agency");
        }
      },
      deep: true
    }
  },
  mounted() {
  
  }
};
</script>
````

