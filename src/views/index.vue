<template>
  <div class="lottery-grid">
    <div style="margin-bottom: 50px;">
      <img style="width: 100px;height:100px" src="../assets/apple.jpeg" />

      </div>
    <div class="grid">
     
      <div
        v-for="(prize, index) in prizes"
        :key="index"
        :class="['grid-item', { active: activeIndex === index }] "
      >
        <div class="prize-container">
          <img style="width:100%;height:100%;z-index:0" :src="prize.imgUrl" />
          <!-- <div class="prize-name">{{ prize.name }}</div> -->
        </div>
      </div>
    </div>
    <el-button type="primary" @click="startLottery" :disabled="isAnimating">开始抽奖</el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  data() {
    return {
      dialogVisible: false,
      prizes: [
        { name: "三次免费贴膜", imgUrl: require('@/assets/tm3.jpg'), probability: 0.01 },
        { name: "霸王茶几", imgUrl: require('@/assets/bwcj.webp'), probability: 0.02 },
        { name: "apple watch 50元优惠卷", imgUrl: require('@/assets/q50.png'), probability: 0.07 },
        { name: 'iphone 15 100元优惠卷', imgUrl: require('@/assets/q100.jpg'), probability: 0.2 },
        { name: '未中奖', imgUrl: require('@/assets/dy.jpg'), probability: 0.3 },
        { name: '1次免费贴膜', imgUrl: require('@/assets/tm.webp'), probability: 0.6 },
      ],
      activeIndex: null,
      isAnimating: false,
      animationDuration: 5000 // 动画时长（毫秒）
    };
  },
  methods: {
    startLottery() {
      this.isAnimating = true;
      this.activeIndex = 0;

      const prizeIndex = this.calculatePrizeIndex();
      const totalSteps = 24 + prizeIndex; // 最少转两圈
      const interval = this.animationDuration / totalSteps;

      let currentStep = 0;
      const intervalId = setInterval(() => {
        this.activeIndex = currentStep % this.prizes.length;
        currentStep++;
        if (currentStep > totalSteps) {
          clearInterval(intervalId);
          setTimeout(() => {
            this.isAnimating = false;
            Dialog.confirm({
              title: "提示",
              message: `恭喜您获得了${this.prizes[this.activeIndex].name}`
            })
              .then(() => {
                // on confirm
              })
              .catch(() => {
                // on cancel
              });
          }, 500); // 延迟500毫秒后显示结果
        }
      }, interval);
    },
    calculatePrizeIndex() {
      const random = Math.random();
      let cumulativeProbability = 0;

      for (let i = 0; i < this.prizes.length; i++) {
        cumulativeProbability += this.prizes[i].probability;
        if (random <= cumulativeProbability) {
          return i;
        }
      }
      return this.prizes.length - 1; // 保底返回最后一个奖品
    }
  }
};
</script>

<style scoped>
.lottery-grid {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  margin-bottom: 20px;
  border:1px solid gray;
  padding: 10px;
}
.grid-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  transition: background-color 0.3s;
}
.prize-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.prize-name {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 0;
}
.grid-item.active {
  /* background-color: hsl(62, 100%, 51%); */
  border: 3px solid red;
  z-index: 999;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
