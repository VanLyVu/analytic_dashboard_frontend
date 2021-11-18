<template>
  <div class="report_chart">
      <line-chart :chart-data="datacollection" :chartOptions="chartOptions" :chartObjects="chartObjects"></line-chart>
  </div>
</template>

<script>
import LineChart from './wrapper/SingleLineChart.js'
import moment from 'moment'

export default {
  components: {
    LineChart
  },
  props: ['reviewReports'],
  data () {
    return {
      datacollection: null,
      chartOptions: {
        scaleYAxesMax: 100,
        scaleLabelText: 'Score',
        getTooltipTitle: function (tooltipItem, data, pointObject) {
          return ''
        },
        getTooltipBody: function (tooltipItem, data, pointObject) {
          const reportByDate = pointObject[tooltipItem.index]
          if (reportByDate.average_score == null) {
            return ''
          }
          return [
            `Score: ${reportByDate.average_score.toFixed(0)}`,
            `Review count: ${reportByDate.review_count}`
          ]
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
