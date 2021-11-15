<template>
  <div class="report_chart">
      <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart
  },
  props: ['reviewReports'],
  data () {
    return {
      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartLabels: [],
      chartDatas: []
    }
  },
  mounted () {
    console.log('mount Report Chart')
    this.convertLabelsAndData()
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.chartDatas
          }
        ]
      }
    },
    convertLabelsAndData () {
      console.log(this.reviewReports)
      if (this.reviewReports['review_dates']) {
        console.log('comehere')
        this.reviewReports['review_dates'].forEach(reportByDate => {
          this.chartLabels.push(reportByDate['date'])
          this.chartDatas.push(reportByDate['average_score'])
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
