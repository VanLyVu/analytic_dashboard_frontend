<template>
  <div class="hotel_report">
      <div>{{msg}}</div>
      <ReportFilter @filtered="onFilter"></ReportFilter>
      <ReportChart></ReportChart>
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
      review_reports: []
    }
  },
  methods: {
    chartParams (filterValue) {
      const params = new URLSearchParams()
      params.append('hotel_id', filterValue.hotel_id)
      params.append('date_from', filterValue.date_from)
      params.append('date_to', filterValue.date_to)
      return params
    },
    onFilter (filterValue) {
      console.log(filterValue.hotel_id)
      console.log(filterValue.is_clear)
      if (filterValue.is_clear) {
        // Clear the chart
      } else {
        // Get report data for the chart
        axios
          .get('http://127.0.0.1:8000/api/hotel_reports/show', {
            params: {
              hotel_id: filterValue.hotel_id,
              date_from: filterValue.date_from,
              date_to: filterValue.date_to
            }
          })
          .then(response => (this.review_reports = response.data))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
