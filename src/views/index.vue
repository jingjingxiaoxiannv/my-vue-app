<template>
  <div class="bigBox">
    <img class="logo" src="../assets/apple1.png" />
    <LuckyGrid
      style="margin: 30px auto;border: 2px solid #cfcfcf;"
      ref="myLuckyGrid"
      :width="300"
      :height="300"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      :activeStyle="activeStyle"
      @start="handleStart"
      @end="handleEnd"
    />
    <p>注：苹果手机提供12-15系列热门款贴膜</p>
    <p>手机型号不符合贴膜，更换为漫甘娜潮玩游戏币</p>
    <!-- <button @click="start">开始抽奖</button> -->
  </div>
</template>

<script>
import { Dialog } from "vant";

import { LuckyGrid } from "vue-luck-draw";

export default {
  components: {
    LuckyGrid
  },
  data() {
    return {
      blocks: [{ padding: "5px", background: "#002f55" }],
      hasDrawn: false,
      prizes: [
        {
          x: 0,
          y: 0,
          background: "#002543",
          imgs: [{ src: require("@/assets/err.png"), width: "93%", top: "5%" }],
          name: "很遗憾，未中奖",
          probability: 0.3,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 1
        },
        {
          x: 1,
          y: 0,
          background: "#002543",
          imgs: [{ src: require("@/assets/q50.png"), width: "93%", top: "5%" }],
          name: "apple watch全系列50元优惠卷",
          probability: 0.05,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 0
        },
        {
          x: 2,
          y: 0,
          background: "#002543",
          imgs: [{ src: require("@/assets/tm.jpg"), width: "93%", top: "5%" }],
          name: "高清钢化膜",
          probability: 0.01,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 0
        },
        {
          x: 0,
          y: 1,
          background: "#002543",
          imgs: [{ src: require("@/assets/1.png"), width: "93%", top: "5%" }],
          name: "漫甘娜美妆潮玩伴手礼",
          probability: 0.07,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 0
        },
        {
          x: 1,
          y: 1,
          imgs: [
            { src: require("@/assets/err.png"), width: "50%", top: "25%" }
          ],
          name: "点击开始",
          probability: 0
        },
        {
          x: 2,
          y: 1,
          background: "#002543",
          imgs: [{ src: require("@/assets/2.png"), width: "93%", top: "5%" }],
          name: "漫甘娜游戏币",
          probability: 0.15,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 0
        },
        {
          x: 0,
          y: 2,
          background: "#002543",
          imgs: [
            { src: require("@/assets/q100.jpg"), width: "93%", top: "5%" }
          ],
          name: "iphone 15全系列100元优惠卷",
          probability: 0.1,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 0
        },
        {
          x: 1,
          y: 2,
          background: "#002543",
          imgs: [{ src: require("@/assets/tm.jpg"), width: "93%", top: "5%" }],
          name: "高清钢化膜",
          probability: 0.02,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 0
        },
        {
          x: 2,
          y: 2,
          background: "#002543",
          imgs: [{ src: require("@/assets/err.png"), width: "93%", top: "5%" }],
          name: "很遗憾，未中奖",
          probability: 0.3,
          activeStyle: { background: "#1da282" },
          borderRadius: 10,
          type: 1
        }
      ],
      buttons: [
        {
          x: 1,
          y: 1,
          background: "#fffbb4",
          fonts: [{ text: "", top: "50%" }],
          imgs: [
            {
              src: require("@/assets/start.png"),
              width: "100",
              top: "-5%",
              left: ""
            }
          ]
        }
      ],
      activeStyle: {
        background: "#5983a6"
      },
      resultIndex: null
    };
  },
  methods: {
    handleStart() {
      if (this.hasDrawn == true) {
        Dialog.confirm({
          title: "提示",
          message: "您已经抽过奖了"
        })
          .then(() => {
            // on confirm
            // this.isAnimating = true
            this.hasDrawn = true;
          })
          .catch(() => {
            this.hasDrawn = true;

            //  this.isAnimating = true
            // on cancel
          });
      } else {
        this.resultIndex = this.getPrizeIndex();
        this.$refs.myLuckyGrid.play();
        setTimeout(() => {
          this.$refs.myLuckyGrid.stop(this.resultIndex);
        }, 3000);
      }
    },
    handleEnd(prize) {
      // alert(`恭喜你获得${prize.name}`)
      Dialog.confirm({
        title: "提示",
        message:
          prize.type != 1 ? `恭喜您获得了${prize.name}` : "很遗憾，未中奖"
      })
        .then(() => {
          // on confirm
          // this.isAnimating = true
          this.hasDrawn = true;
        })
        .catch(() => {
          this.hasDrawn = true;

          //  this.isAnimating = true
          // on cancel
        });
    },
    start() {
      this.handleStart();
    },
    getPrizeIndex() {
      const totalProbability = this.prizes.reduce(
        (acc, prize) => acc + prize.probability,
        0
      );
      let random = Math.random() * totalProbability;
      for (let i = 0; i < this.prizes.length; i++) {
        if (random < this.prizes[i].probability) {
          return i;
        }
        random -= this.prizes[i].probability;
      }
      return 0;
    }
  }
};
</script>

<style lang="less" scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.bigBox {
  width: 100%;
  height: 100%;
  text-align: center;
  background: #002f55;
  padding: 20% 0;
  color:#fff;
  .logo {
    width: 100px;
    height: 100px;
    margin-bottom: 10%;
  }
}
</style>
