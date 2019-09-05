## 一、class的绑定

单个判断推荐[1](#1我们可以传给v-bindclass一个对象以动态地切换-class")，两个条件动态切换推荐[5](#5三元表达式动态切换class推荐)，多个推荐[4](#4数组的方式绑定class)

<h4 id=“1我们可以传给v-bindclass一个对象以动态地切换-class”>1.我们可以传给 `v-bind:class` 一个对象，以动态地切换 class</h4>

> 根据`isActive`的true,false变化，动态绑定单个class

````vue
<div :class="{ active: isActive==true }"></div>
````
#### 2.你可以在对象中传入更多属性来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class 属性共存。 

> 根据`classObject`里面的`active`和`text-danger`的变化，动态绑定多个class

````vue
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

//如下 data：
//isActive为true时渲染active，hasError为true时class渲染text-danger
data: {
  isActive: true,
  hasError: false
}

//结果渲染为：

<div class="static active"></div>
````

绑定的数据对象不必内联定义在模板里：

```vue
<div :class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

#### 3.计算属性的方式绑定class

> 根据计算属性的判断动态绑定多个class

```js
<div :class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,	//isActive为true，且error不为null
      'text-danger': this.error && this.error.type === 'fatal'
        //error为null且this.error.type === 'fatal'
    }
  }
}
```

<h4 id=“4数组的方式绑定class”>4.数组的方式绑定class</h4>

> 如果你想动态绑定多个class，可以用一个数组

```js
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
渲染为：
<div class="active text-danger"></div>
```

例如：

````html
<li :class='[{ check_pendingStatus: p.AuditState==1 },{ passStatus: p.AuditState==2 } ,{ rejectStatus: p.AuditState==3 }]' v-if="p.AuditState==1">
</li>
````

<h4 id=“5三元表达式动态切换class推荐”>5.三元表达式动态切换class(推荐)</h4>

> `errorClass`条件不满足

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

#### 6.用在组件上

> 这个章节假设你已经对 [Vue 组件](https://cn.vuejs.org/v2/guide/components.html)有一定的了解。当然你也可以先跳过这里，稍后再回过头来看。
>
> class被绑定在子组件的根元素上

```html
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

```html
<my-component class="baz boo"></my-component>
```

HTML 将被渲染为:

```html
<p class="foo bar baz boo">Hi</p>
```

对于带数据绑定 class 也同样适用：

```html
<my-component v-bind:class="{ active: isActive }"></my-component>
```

当 `isActive` 为 truthy 时，HTML 将被渲染成为：

```html
<p class="foo bar active">Hi</p>
```

## 二、style的绑定

#### 7.对象方式

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名：

> 

```js
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```js
<div :style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

#### 8.数组语法绑定style

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```
