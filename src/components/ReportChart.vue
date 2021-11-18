<template>
  <div class="report_chart">
      <line-chart :chart-data="datacollection" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import moment from 'moment'

export default {
  components: {
    LineChart
  },
  props: ['reviewReports'],
  data () {
    let that = this
    return {
      datacollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              beginAtZero: true
            },
            gridLines: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Score'
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
              return ''
            },
            label: function (tooltipItem, data) {
              const reportByDate = that.chartObjects[tooltipItem.index]
              if (reportByDate.average_score == null) {
                return ''
              }
              return [
                `Score: ${reportByDate.average_score.toFixed(0)}`,
                `Review count: ${reportByDate.review_count}`
              ]
            }
          },
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          displayColors: false,
          bodyFontColor: 'black',
          bodyAlign: 'center'
        }
      },
      chartLabels: [],
      chartDatas: [],
      chartObjects: [],
      dateGroup: null
    }
  },
  mounted () {
    this.convertLabelsAndData()
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.chartLabels,
        datasets: [
          {
            borderColor: 'grey',
            borderWidth: 6,
            label: 'Score',
            backgroundColor: '#00000000',
            data: this.chartDatas
          }
        ]
      }
    },
    convertLabelsAndData () {
      if (this.reviewReports['review_dates']) {
        this.dateGroup = this.reviewReports['date_group']

        this.reviewReports['review_dates'].forEach(reportByDate => {
          this.chartLabels.push(this.getDateLabel(reportByDate['date']))
          if (reportByDate['average_score'] !== null) {
            this.chartDatas.push(reportByDate['average_score'].toFixed(0))
          } else {
            this.chartDatas.push(null)
          }

          this.chartObjects.push(reportByDate)
        })
      }
    },
    getDateLabel (reportDate) {
      const date = moment(reportDate, 'YYYY-MM-DD')

      if (this.dateGroup === 'monthly') {
        return date.format('YYYY-MM')
      }

      if (this.dateGroup === 'weekly') {
        let monthDisplay = ''

        if (date.date() < 7 || date.date() > date.daysInMonth() - 6) {
          monthDisplay = date.format('YYYY-MM')
        }

        return ['Week ' + date.week(), monthDisplay]
      }

      return reportDate
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
