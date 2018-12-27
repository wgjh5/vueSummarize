## Vue中Echart用法

## 一、先下载`echarts`

```bash
cnpm install echarts --save-dev
```

## 二、在`main.js`中引入

```bash
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
```

## 三、新建`hours.vue`组件

```
    <div>
        <div id="myChart" :style="{ height: '140px'}"></div>
        <p class="title">伦敦金</p>
        <p class="percent1">{{percent1}}.00%</p>
        <p class="percent2">{{percent2}}.00%</p>
        <p class="time">数据更新时间：{{year}}&nbsp;{{time}}</p>
    </div>
```

## 四、在methods里面写这段代码

```js
 mounted() {
    this.drawLine();	//执行下面的函数
  },
methods: {
    drawLine() {
      // var i=0;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var color = ["#19D672", "#FD517D"];
      // 绘制图表
      myChart.setOption({
        color: ["#23D864", "#FF4D51"],

        // title: { text: '伦敦金' },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        legend: [
          {
            // orient: "vertical",
            itemWidth: 15,
            x: "2%",
            y: "20%",

            textStyle: {
              // color: '#ccc',
            },

            data: ["买跌"]
          },
          {
            itemWidth: 15,

            // orient: "vertical",
            x: "80%",
            y: "20%",
            data: ["买涨"]
          }
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            data: ["20%", "80%"],
            radius: ["42%", "50%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },

              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "0",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            itemStyle: {
              top: "50"

              // borderWidth: 50, //设置border的宽度有多大
            },

            data: [
              {
                value: this.percent1,
                name: "买跌",
                a: "1"
              },
              {
                value: this.percent2,
                name: "买涨",
                a: "1"
              }
            ]
          }
        ]
      });
    }
  }
```

## 五、整体代码

````vue
<template>
<div>

    <div>
        <div id="myChart" :style="{ height: '140px'}"></div>
        <p class="title">伦敦金</p>
        <p class="percent1">{{percent1}}.00%</p>
        <p class="percent2">{{percent2}}.00%</p>
        <p class="time">数据更新时间：{{year}}&nbsp;{{time}}</p>
    </div>
    <pieChart />

</div>
</template>

<script>
import pieChart from "./pieChart.vue";

export default {
  components: {
    pieChart
  },
  data() {
    return {
      percent1: 30,
      percent2: 70,
      year: "2018-10-20",
      time: "10:05:03"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // var i=0;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var color = ["#19D672", "#FD517D"];
      // 绘制图表
      myChart.setOption({
        color: ["#23D864", "#FF4D51"],

        // title: { text: '伦敦金' },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        legend: [
          {
            // orient: "vertical",
            itemWidth: 15,
            x: "2%",
            y: "20%",

            textStyle: {
              // color: '#ccc',
            },

            data: ["买跌"]
          },
          {
            itemWidth: 15,

            // orient: "vertical",
            x: "80%",
            y: "20%",
            data: ["买涨"]
          }
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            data: ["20%", "80%"],
            radius: ["42%", "50%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },

              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "0",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            itemStyle: {
              top: "50"

              // borderWidth: 50, //设置border的宽度有多大
            },

            data: [
              {
                value: this.percent1,
                name: "买跌",
                a: "1"
              },
              {
                value: this.percent2,
                name: "买涨",
                a: "1"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/reset.scss";

div {
  padding: 0 rem(30);

  #myChart {
    border-bottom: rem(1) solid $line_color;
  }

  position: relative;

  .title {
    position: absolute;
    left: 44%;
    top: 29%;
    font-size: rem(30);
  }

  .percent1 {
    position: absolute;
    left: 10%;
    top: 35%;
    font-size: rem(32);
    color: #333;
    font-weight: bold;
    line-height: rem(55);
  }

  .percent2 {
    position: absolute;
    right: 10%;
    top: 35%;
    font-size: rem(32);
    color: #333;
    font-weight: bold;
    line-height: rem(55);
  }

  .time {
    position: absolute;
    left: 24%;
    top: 70%;
  }
}
</style>

````

#### 效果图如下：

![1545913923396](https://user-images.githubusercontent.com/43693262/50480530-6108c100-0a17-11e9-8667-8b9812e17770.png)
