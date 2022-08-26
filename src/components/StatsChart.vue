<script>
import { Line, mixins } from "vue-chartjs";
// import { ReactivePropMixin } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  prosps: {
    chartData: {
      type: Object
    }
  },

  //https://www.chartjs.org/docs/latest/ for docs on cossumizations
  mounted() {
    this.renderChart(this.chartData, {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              maxTicksLimit: 10
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    });
  }
};
</script>
