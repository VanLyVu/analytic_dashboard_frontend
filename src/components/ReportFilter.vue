<template>
  <div class="report_filter">
    <form id="filter_form">
      <fieldset class="container">
        <legend>Filter</legend>
        <div class="hotel-filter">
          <select v-on:change="submitSearch()" name="hotel_id" v-model="filter.hotel_id">
            <option v-bind:value="null">Select Hotel</option>
            <option v-for="hotel in hotels" :key="hotel.id" v-bind:value="hotel.id">
              {{hotel.name}}
            </option>

          </select>
        </div>
        <div class="date-filter">
          <div class="date-from-filter">
            <span>FROM</span>
            <input type="date" name="date_from" v-on:change="submitSearch()" v-model="filter.date_from"/>
          </div>
          <div class="date-to-filter">
            <span>TO</span>
            <input type="date" name="date_to" v-on:change="submitSearch()" v-model="filter.date_to"/>
          </div>
        </div>
      </fieldset>
    </form>
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
    let that = this
    axios
      .get('http://127.0.0.1:8000/api/hotel_reports/hotels')
      .then(response => {
          this.hotels = response.data
        }
      )
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
.container {
  display: flex;
}

.container .hotel-filter {
  flex: 1;
  display: flex;
  justify-content: center;
}

.container .hotel-filter select {
  width: 200px;
}

.container .date-filter {
  flex: 2;
  display: flex;
}

.container .date-filter .date-from-filter, .date-to-filter {
  flex: 1;
  display: flex;
  justify-content: center;
  column-gap: 15px;
}

@media (max-width: 800px) {
  .container {
    flex-direction: column;
    row-gap: 15px;
  }

  .container .hotel-filter {
    justify-content: left;
  }

  .container .date-filter .date-from-filter, .date-to-filter {
    justify-content: left;
  }
}

@media (max-width: 480px) {
  .container .date-filter {
    flex-direction: column;
    row-gap: 15px;
  }
}
</style>
