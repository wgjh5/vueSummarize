**Vue.js 有一个方法 watch，它可以用来监测Vue实例上的数据变动。**

> 如果对应一个对象，键是观察表达式，值是对应回调，值也可以是方法名，或者是对象，包含选项。

#### 1.简单用法，监听data里面的数据

> 下面这个就浅显易懂了，通过watch来直接监测demo，如果demo的值变化，value的值也会跟着一起变化。

````vue
<template>
  <div>
   <el-input v-model="demo"></el-input>
    {{value}}
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        demo: '',
        value: ''
      };
    },
    watch: {
      demo(val) {
        this.value = this.demo;
      }
    }
  };
</script>
````

#### 2.配合计算属性(computed)监听对象里面的键值对

> 下面这个例子，如果watch监测的是一个对象的话，直接使用watch是不行的，此时我们可以借助于computed计算属性来完成。

````vue
<template>
  <div>
    <el-input v-model="demo.name"></el-input>
    {{value}}
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        demo: {
          name: ''
        },
        value: ''
      };
    },
    computed: {
      newName() {
        return this.demo.name;
       //也可监听vuex
       // return this.$store.state.demo;
       // return this.$store.getters.getDemo;
      }
    },
    watch: {
      newName(val) {
        this.value = val;
      }
    }
  };
</script>
````

#### 3.深度监听直接监听对象里面的键值对

````vue
<template>
    <div id="app">
      <input type="text" v-model="childrens.name" />
      <input type="text" v-model="lastName" />
    </div>
</template>
<script>
  export default {
    name: 'index',
    data: {
      childrens: {
        name: '小强',
        age: 20,
        sex: '男'
      },
      tdArray:["1","2"],
      lastName:"张三"
    },
    watch:{
       //对象内部的属性监听，也叫深度监听
      childrens:{
        handler:function(val,oldval){
          console.log(val.name)
        },
        deep:true
      },
        //键路径必须加上引号
      'childrens.name':function(val,oldval){
        console.log(val+"aaa")
      },
        //也可直接监听vuex
      '$store.getters.getOpenIndex': {
          handler(newV, oldV) {
              this.idx = newV
          },
          deep: true
      },
        //以V-model绑定数据时使用的数据变化监测
      lastName:function(val,oldval){
        console.log(this.lastName)
      }
    },
  }
   //主动调用$watch方法来进行数据监测
  vm.$watch("lastName",function(val,oldval){
    console.log(val)
  })
</script>

````

#### 4.watch监听失效解决办法(immediate)

> immediate表示在watch中首次绑定的时候，是否执行handler，值为true则表示在watch中声明的时候，就立即执行handler方法，值为false，则和一般使用watch一样，在数据发生变化的时候才执行
> 像上面方式使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。
>
> 比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。

````js
watch: {
    '$route': {
        immediate:true,
            handler(newName, oldName) {
            console.log('$route has changed');
        },
    },
     //或
     name(newV, oldV) {
      // ...
        immediate:true
    }
},
````

[参考链接1](https://www.cnblogs.com/jin-zhe/p/9319648.html)

[参考链接2](https://blog.csdn.net/qq_27449993/article/details/88546717)