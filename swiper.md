## swiper用法

#### 1.先下载

```bash
cnpm install swiper --save-dev
```

#### 2.结构

```html
<div class="swiper-container">
   <div class="swiper-wrapper">
     <div class="swiper-slide">
         <img src="../../assets/img/mine/shopDetail.png" alt=""></div>
     <div class="swiper-slide">
         <img src="../../assets/img/mine/shopDetail2.png" alt=""></div>
     <div class="swiper-slide">
         <img src="../../assets/img/mine/shopDetail3.png" alt=""></div>
    </div>
                    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

</div>
```

#### 3.js

```js
//普通水平滑动轮播 
swiper() {
      var mySwiper = new Swiper(".swiper-container", {
        speed: 500,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          clickableClass: "my-pagination-clickable"
        }
      });
    },
//3d手动轮播
  swiper() {
      var mySwiper = new Swiper(".swiper-container", {
        speed: 500,
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          clickableClass: "my-pagination-clickable"
        }
      });
    },
```

#### 4.样式

> 备注：样式需另起一个style写，不能用scoped锁住，只有这样才能覆盖`swipe`r的样式，
>
> 切记要引入`swiper`的自带样式，去`nodemodules`里面找

```css
//分页器样式
<style lang="scss">
@import "../../assets/css/reset.scss";
@import "../../assets/css/swiper.min.css";
.swiper-container .swiper-pagination {
  width: 100%;
  height: rem(200);
  opacity: 1;
  z-index: 100000;
  padding-left: rem(315);
  position: absolute;
  left: rem(380);
  top: rem(306);

  span {
    display: block;
    width: rem(12);
    height: rem(12);
    background-color: #fff;
    opacity: 1;
    float: left;
    margin-right: rem(20);
    z-index: 100000;
    border-radius: 50%;
  }

  .swiper-pagination-bullet-active {
    width: rem(22);
    height: rem(9);
    background-color: #e4bc7c;
    border-radius: rem(5);
    z-index: 100000;
  }
}
</style>

```

