<template>
  <div class="hotel_report">
      <div>{{msg}}</div>
      <ReportFilter @filtered="onFilter"></ReportFilter>
      <ReportChart v-if="chartLoaded" :reviewReports="review_reports"></ReportChart>
  </div>
</template>

<script>
import ReportChart from '@/components/ReportChart'
import ReportFilter from '@/components/ReportFilter'
import axios from 'axios'

export default {
  name: 'HotelReport',
  components: {
    ReportChart,
    ReportFilter
  },
  data () {
    return {
      msg: 'Hotel Report Page',
      review_reports: [],
      chartLoaded: false
    }
  },
  methods: {
    async onFilter (filterValue) {
      if (filterValue.is_clear) {
        // Clear the chart
        this.review_reports = []
        this.chartLoaded = false
      } else {
        // Get report data for the chart
        this.chartLoaded = false
        await axios
          .get('http://127.0.0.1:8000/api/hotel_reports/show', {
            params: {
              hotel_id: filterValue.hotel_id,
              date_from: filterValue.date_from,
              date_to: filterValue.date_to
            }
          })
          .then(response => (this.review_reports = response.data))
        this.chartLoaded = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
