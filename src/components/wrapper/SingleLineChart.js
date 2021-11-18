import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartOptions', 'chartObjects'],
  data () {
    let that = this
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: this.chartOptions.scaleYAxesMax,
              beginAtZero: true
            },
            gridLines: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: this.chartOptions.scaleLabelText
            }
          }]
        },
        legend: {
          display: false
        },
        elements: {
          line: {
            tension: 0 // disables bezier curves
          },
          point: {
            radius: 4
          }
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return that.chartOptions.getTooltipTitle(tooltipItem, data, that.chartObjects)
            },
            label: function (tooltipItem, data) {
              return that.chartOptions.getTooltipBody(tooltipItem, data, that.chartObjects)
            }
          },
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          displayColors: false,
          bodyFontColor: 'black',
          bodyAlign: 'center'
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
