<template>
  <div class="report_filter">
    <form id="filter_form">
      <fieldset>
        <legend>Filter</legend>
        <div>
          <select v-on:change="submitSearch()" name="hotel_id" v-model="filter.hotel_id">
            <option v-bind:value="null">Select Hotel</option>
            <option v-for="hotel in hotels" :key="hotel.id" v-bind:value="hotel.id">
              {{hotel.name}}
            </option>

          </select>
        </div>
        <div>
          <span>FROM</span>
          <input type="date" name="date_from" v-on:change="submitSearch()" v-model="filter.date_from"/>
          <span>TO</span>
          <input type="date" name="date_to" v-on:change="submitSearch()" v-model="filter.date_to"/>
        </div>
      </fieldset>
    </form>
      <div>{{msg}}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReportFilter',
  data () {
    return {
      msg: 'Report Filter Area',
      hotels: [],
      filter: {
        hotel_id: null,
        date_from: null,
        date_to: null,
        is_clear: true
      }
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/hotel_reports/hotels')
      .then(response => (this.hotels = response.data))
  },
  methods: {
    submitSearch () {
      this.filter.is_clear = this.isClear()
      this.$emit('filtered', this.filter)
    },
    isClear () {
      return !this.filter.hotel_id || !this.filter.date_from || !this.filter.date_to
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
