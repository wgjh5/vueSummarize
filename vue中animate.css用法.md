## vue中`animate.css`用法

#### 1.先下载

```bash
cnpm install animate.css --save
```

#### 2.引入

```js
import animated from 'animate.css' 
Vue.use(animated)

```

#### 3.用法

```html
  <div v-if="nextStatus==false" ref="statusOne"
       <!--添加类名的方式-->
       class="animated rotateInDownRight">
      <div class="phone_number code_popup">
          <div class="phoneTitle">
              <span>+86</span>
          </div>
          <span>{{phoneNumber}}</span>
 </div>
```

#### fade

|      title      |   淡入淡出   |
| :-------------: | :----------: |
|     fadeIn      |     淡入     |
|   fadeInDown    |   向下淡入   |
|  fadeInDownBig  | 向下快速淡入 |
|   fadeInLeft    |   向右淡入   |
|  fadeInLeftBig  | 向右快速淡入 |
|   fadeInRight   |   向左淡入   |
| fadeInRightBig  | 向左快速淡入 |
|    fadeInUp     |   向上淡入   |
|   fadeInUpBig   | 向上快速淡入 |
|     fadeOut     |     淡出     |
|   fadeOutDown   |   向下淡出   |
| fadeOutDownBig  | 向下快速淡出 |
|   fadeOutLeft   |   向左淡出   |
| fadeOutLeftBig  | 向左快速淡出 |
|   adeOutRight   |   向右淡出   |
| fadeOutRightBig | 向右快速淡出 |
|    fadeOutUp    |   向上淡出   |
|  fadeOutUpBig   | 向上快速淡出 |

#### bounce

|     title      |    弹跳类    |
| :------------: | :----------: |
|    bounceIn    |   弹跳进入   |
|  bounceInDown  | 向下弹跳进入 |
|  bounceInLeft  | 向右弹跳进入 |
| bounceInRight  | 向左弹跳进入 |
|   bounceInUp   | 向上弹跳进入 |
|   bounceOut    |   弹跳退出   |
| bounceOutDown  | 向下弹跳退出 |
| bounceOutLeft  | 向左弹跳退出 |
| bounceOutRight | 向右弹跳退出 |
|  bounceOutUp   | 向上弹跳退出 |

#### zoom

|    title     |    缩放类    |
| :----------: | :----------: |
|    zoomIn    |   放大进入   |
|  zoomInDown  | 向下放大进入 |
|  zoomInLeft  | 向右放大进入 |
| zoomInRight  | 向左放大进入 |
|   zoomInUp   | 向上放大进入 |
|   zoomOut    |   缩小退出   |
| zoomOutDown  | 向下缩小退出 |
| zoomOutLeft  | 向左缩小退出 |
| zoomOutRight | 向右缩小退出 |
|  zoomOutUp   | 向上缩小退出 |

#### rotate

|       title        |     旋转类     |
| :----------------: | :------------: |
|      rotateIn      | 顺时针旋转进入 |
|  rotateInDownLeft  |  从左往下旋入  |
| rotateInDownRight  |  从右往下旋入  |
|   rotateInUpLeft   |  从左往上旋入  |
|  rotateInUpRight   |  从右往上旋入  |
|     rotateOut      | 顺时针旋转退出 |
| rotateOutDownLeft  |   向左下旋出   |
| rotateOutDownRight |   向右下旋出   |
|  rotateOutUpLeft   |   向左上旋出   |
|  rotateOutUpRight  |   向右上旋出   |

#### flip

|  title   |    翻转类    |
| :------: | :----------: |
| flipInX  | 水平翻转进入 |
| flipInY  | 垂直翻转进入 |
| flipOutX | 水平翻转退出 |
| flipOutY | 垂直翻转退出 |

#### strong

|   title    |   强调类   |
| :--------: | :--------: |
|   bounce   |    弹跳    |
|   flash    |    闪烁    |
|   pulse    |    脉冲    |
| rubberBand |   橡皮筋   |
|   shake    | 左右弱晃动 |
|   swing    |  上下摆动  |
|    tada    |  缩放摆动  |
|   wobble   | 左右强晃动 |
|   jello    |  拉伸抖动  |

