<template>
  <div class="stats-container">
    <div class="stats-top">
      <span class="stat">WPM: {{ avgWpm }}</span>

      <span class="stat">Accuracy: {{ avgAccuracy }}</span>
    </div>
    <div class="chart-container">
      <StatsChart :chartData="chartData" />
    </div>
    <div class="stats-bottom">
      <span class="stat">Gross WPM {{ avgGrossWpm }}</span>
      <span class="stat"
        >correct/incorrect/extra/incomplete : {{ correct }}/{{ incorrect }}/{{
          extra
        }}/{{ incomplete }}
      </span>
    </div>
    <div class="center-btn">
      <button class="redo" @click="reset">redo</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StatsChart from "./StatsChart";

export default {
  name: "StatsPage",
  components: {
    StatsChart
  },
  methods: {
    ...mapActions(["resetContent", "resetTimer", "resetStats"]),

    reset() {
      this.resetTimer();
      this.resetContent();
      this.resetStats();
    }
  },
  computed: {
    ...mapGetters(["correct", "incorrect", "extra", "incomplete", "calcStats"]),
    avgAccuracy: function() {
      let sum = 0;
      this.calcStats.forEach(stat => {
        sum += stat.accuracy;
      });
      const avg = sum / this.calcStats.length;
      return Math.round(avg * 10) / 10;
    },
    avgGrossWpm: function() {
      let sum = 0;
      this.calcStats.forEach(stat => {
        sum += stat.grossWpm;
      });
      const avg = sum / this.calcStats.length;
      return Math.round(avg * 10) / 10;
    },
    avgWpm: function() {
      let sum = 0;
      this.calcStats.forEach(stat => {
        sum += stat.wpm;
      });
      const avg = sum / this.calcStats.length;
      return Math.round(avg * 10) / 10;
    },
    chartData: function() {
      const times = this.calcStats.map(stat => stat.stats.time);
      const wpms = this.calcStats.map(stat => stat.wpm);
      const grossWpms = this.calcStats.map(stat => stat.grossWpm);
      return {
        labels: times,
        datasets: [
          {
            label: "WPM",
            data: wpms
          },
          {
            label: "Gross WPM",
            data: grossWpms
          }
        ]
      };
    }
  }
};
</script>

<style></style>
