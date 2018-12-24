## 12.21 vue不同版本用法

### 一、vue2.9.6版本起步

1. 先安装`node`环境

   [Node下载](https://nodejs.org/en/)

2. 再安`vue`的装脚手架

```
npm install -g vue-cli
```

3. 创建项目

```
vue init webpack my-project
```

### 二、vue3.0版本起步

> 关于旧版本
>
> Vue CLI 的包名称由 `vue-cli` 改成了 `@vue/cli`。 如果你已经全局安装了旧版本的 `vue-cli`(1.x 或 2.x)，你需要先通过 `npm uninstall vue-cli -g` 或 `yarn global remove vue-cli` 卸载它。

1.安装脚手架

```bash
npm install -g @vue/cli
```

2.检查版本是否安装正确

```bash
vue --version
```

3.查看版本号

```bash
vue -V
```

4.创建项目

```bash
vue create weibo
```

5.定位到该文件夹

```bash
cd weibo
```

6.启动服务器

```bash
npm run serve
```

### 三、在`vue2.9.6脚手架`用vuxUI配置

[wux官方文档](https://doc.vux.li/zh-CN/)

1.在项目里安装`vux` 

```bash
npm install vux --save-dev 
```

2.安装vux-loader **（这个vux文档中没有明文跟你说要安装的啦）** 

```bash
npm install vux-loader --save-dev 
```

3.安装less-loader 

> （这个是用以正确编译less源码，否则会出现 ' Cannot GET / '，自己看package.json，如果安装了，就不用装啦！）

```bash
npm install less less-loader --save-dev 
```

4.在build文件夹下`webpack.base.conf.js` 文件进行配置 

```js
const vuxLoader = require('vux-loader') //【新加上去的】
const webpackConfig = originalConfig //【originalConfig就是原来的 


//module.exports出去的代码，把它整个赋值给变量 webpackConfig】
// 【在最后加多一句，这里就是引用插件vux啦！】
module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })    

```

5.最后别忘了，在resolve: { extensions: ['.js', '.vue', '.json','.less']里加入.less。

```js
resolve: { extensions: ['.js', '.vue', '.json','.less']
```

6.`webpack.base.conf.js`整体代码

```js
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader') 

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
//test: /\.(js|vue)$/,
//loader: 'eslint-loader',
//enforce: 'pre',
//include: [resolve('src'), resolve('test')],
//options: {
//  formatter: require('eslint-friendly-formatter'),
//  emitWarning: !config.dev.showEslintErrorsInOverlay
//}
})

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })

```

7.需要什么在`main.js`里面引入即可，例如

```js
import { Tab, TabItem } from 'vux'

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
```

### 四、底部导航制作步骤

> 思路：底部导航动态切换的是路由 ，然后当你点击前有个未选中时的颜色，点击后有个选中时的颜色，这时图片就要动态切换路径，文字就要动态设置颜色，我用的是组件复用的方式，当你点击时通知向vuex仓库传递索引，别的页面拿到索引，动态选中颜色

1.先下载`vue-router`

```bash
npm install vue-router --save-dev
```

2.在`src`里面新建`router`文件夹，在`router`里面新建`index.js`文件,搭建好路由

```js
import Vue from 'vue'
import Router from '	'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: resolve => require(['@/pages/Home.vue'], resolve),
	},
	{
		path: '/transaction',
		name: 'transaction',
		component: resolve => require(['@/pages/Transaction.vue'], resolve),
	},	{
		path: '/athletics',
		name: 'athletics',
		component: resolve => require(['@/pages/Athletics.vue'], resolve),
	},
	{
		path: '/information',
		name: 'information',
		component: resolve => require(['@/pages/Information.vue'], resolve),
	},
	{
		path: '/mine',
		name: 'mine',
		component: resolve => require(['@/pages/Mine.vue'], resolve),
	}
	]
})
```

3.新建`footerBar`搭建结构

- `dom`结构

```html
<template>
   
    
        <div class="footer">
            <ul>
                <li v-for="(f,index) in footerBar" :key="index" :class="{active:idx==index}" @click="toggle(index)">
                    <img :src='idx===index?f.selectSrc:f.src' alt="">
                    <span>{{f.title}}</span>
                    </li>
            </ul>
        </div>
    
</template>
```

- `js`逻辑

```js
<script>
export default {
  data() {
    return {
      idx: 0,
      footerBar: [
        {
          title: "首页",
          path: "home",
          src: require("@/assets/img/home/home.png"),
          selectSrc: require("@/assets/img/home/homeSelect.png")
        },
        {
          title: "交易",
          path: "transaction",
          src: require("@/assets/img/home/transaction.png"),
          selectSrc: require("@/assets/img/home/transactionSelect.png")
        },
        {
          title: "竞技",
          path: "athletics",
          src: require("@/assets/img/home/athletics.png"),
          selectSrc: require("@/assets/img/home/athleticsSelect.png")
        },
        {
          title: "资讯",
          path: "information",
          src: require("@/assets/img/home/information.png"),
          selectSrc: require("@/assets/img/home/informationSelect.png")
        },
        {
          title: "我的",
          path: "mine",
          src: require("@/assets/img/home/mine.png"),
          selectSrc: require("@/assets/img/home/mineSelect.png")
        }
      ]
    };
  },
  methods: {
    toggle(index) {
      this.idx = index;
      this.$store.dispatch("setIndex", index);
      this.$router.push({ name: this.footerBar[index].path });
    },
    setChannel(idx) {
      var route = this.$router.history.current.path;
      //   route = route.split("/");

      switch (route) {
        case "/home":
          this.idx = 0;
          break;
        case "/transaction":
          this.idx = 1;
          break;
        case "/athletics":
          this.idx = 2;
          break;
        case "/information":
          this.idx = 3;
          break;
        case "/mine":
          this.idx = 4;
          break;
        default:
          this.idx = 0;
      }
    }
  },
  computed: {},
  mounted() {
    this.idx = this.$store.getters.getidx;
    this.setChannel();
  }
};
</script>
```

- `css`样式

```css
<style scoped lang='scss'>
@import "../assets/css/reset.scss";
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
ul {
  font-family: PingFangSC-Regular;
  display: flex;
  font-size: 1.375rem;
  justify-content: space-around;
}
ul li {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: rem(22);
  align-items: center;
}
li.active::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: rem(-18);
  width: rem(90);
  height: rem(5);
  border-radius: rem(40);
  background-color: #c59b59;
}
.active {
  color: #c59b59;
}
ul li span {
  line-height: rem(50);
  font-size: rem(22);
}
img {
  width: rem(44);
}
</style>

```

4.在src文件夹里面新建store，里面新建`index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idx: 0
    },
    getters: {
        getidx: state => {
			return state.idx
		},
    },
    mutations: {
        editiIndex(state, data) {
            state.idx = data
        }

    },
    actions: {
        setIndex(conText, data) {
            conText.commit('editiIndex', data);
        }

    }
});
```

