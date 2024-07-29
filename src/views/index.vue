<template>
  <div class="lottery-grid">
    <div style="margin-bottom: 10px;">
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
import { Dialog } from "vant";
import { prizes } from "@/js/prizes.js"; // 导入奖品配置

export default {
  data() {
    return {
      dialogVisible: false,
      prizes,
      activeIndex: null,
      isAnimating: false,
      animationDuration: 5000, // 动画时长（毫秒）
      cumulativeWeights: [],
    };
  },
  created() {
    this.calculateCumulativeWeights();
    this.testRandomDistribution();
  },
  methods: {
    calculateCumulativeWeights() {
      let cumulative = 0;
      this.cumulativeWeights = this.prizes.map(prize => {
        cumulative += prize.weight;
        return cumulative;
      });
    },
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
              message: this.prizes[this.activeIndex].type == 1
                ? `恭喜您获得了${this.prizes[this.activeIndex].name}`
                : "很遗憾，未中奖"
            })
              .then(() => {
                // on confirm
                this.isAnimating = true
              })
              .catch(() => {
                 this.isAnimating = true
                // on cancel
              });
          }, 500); // 延迟500毫秒后显示结果
        }
      }, interval);
    },
    calculatePrizeIndex() {
      const random = Math.random() * this.cumulativeWeights[this.cumulativeWeights.length - 1];
      for (let i = 0; i < this.cumulativeWeights.length; i++) {
        if (random <= this.cumulativeWeights[i]) {
          return i;
        }
      }
      return this.cumulativeWeights.length - 1; // 保底返回最后一个奖品
    },
    testRandomDistribution() {
      const sampleSize = 10000; // 运行测试的次数
      const counts = Array(this.prizes.length).fill(0);
      for (let i = 0; i < sampleSize; i++) {
        const index = this.calculatePrizeIndex();
        counts[index]++;
      }
      console.log("测试结果：", counts.map((count, index) => ({
        prize: this.prizes[index].name,
        count,
        frequency: count / sampleSize
      })));
    },
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
  padding: 50px 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  margin-bottom: 50px;
  border: 1px solid gray;
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
.grid-item.active {
  border: 3px solid red;
  z-index: 999;
}
</style>
