## 一、传值

#### 1.父传子

````vue
<!--父组件-->
<template>
  <child :msg="msg"></child>
</template>
<script>
    import child from "./child.vue"
      export default {
      components:{child},
        data(){
            return{
                msg:"hello"
            }
        }
      }
</script>
<!--子组件-->
<template>
  <div>{{msg}}</div>
</template>
<script>
    export default {
   	 props:['msg']
   }
</script>
````

#### 2.子传父

````js
<!-- 子组件 -->
<template>
    <div id="child">
        <button @click="tryToParent">click</button>
    </div>
</template>
<script>
export default {
    name: 'child',
    methods:{
        tryToParent(){
            // 通过$emit进行触发
            // 第一个参数为父组件监听的事件名，后续参数为父组件方法的参数
            this.$emit("toParent","我从子组件传来")
        }
    }
}
</script>

<!-- 父组件 -->
<template>
    <div id="parent">
        <!-- 监听child的toParent事件广播，用fromChild进行处理 -->
        <child @toParent="fromChild"></child>
    </div>
</template>
<script>
import child from "./child.vue"
export default {
    name: 'parent',
    components:{child},
    methods:{
        fromChild(msg){
            console.log(msg);  // 点击子组件的button，这里最终打印出“我从子组件传来”
        }
    }
}
</script>
//或者在mounted里面写
this.$on('toParent',msg=>{
    console.log(msg);  // 点击子组件的button，这里最终打印出“我从子组件传来”
})

````



## 二、父子组件方法互调

#### 1.父调子

````vue
<template>
  <child ref="child"></child>
</template>
<script>
  methods:{
     useMyChildAPI(){
       this.$refs.child.fn1();
     }
  }
</script>
````

#### 2.子调父

````js
this.$parent.useMyChildAPI();
````

