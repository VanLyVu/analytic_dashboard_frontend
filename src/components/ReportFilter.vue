<template>
  <div class="report_filter">
    <fieldset class="filter">
      <legend>Filter</legend>
      <div class="filter__single">
        <select class="filter__single__select" v-on:change="submitSearch()" name="hotel_id" v-model="filter.hotel_id">
          <option v-bind:value="null">Select Hotel</option>
          <option v-for="hotel in hotels" :key="hotel.id" v-bind:value="hotel.id">
            {{hotel.name}}
          </option>
        </select>
      </div>
      <div class="filter__twice">
        <div class="filter__twice__item">
          <span>FROM</span>
          <input type="date" name="date_from" v-on:change="submitSearch()" v-model="filter.date_from"/>
        </div>
        <div class="filter__twice__item">
          <span>TO</span>
          <input type="date" name="date_to" v-on:change="submitSearch()" v-model="filter.date_to"/>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReportFilter',
  data () {
    return {
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
    this.loadHotels()
  },
  methods: {
    loadHotels () {
      axios
      .get(process.env.API_URL + '/api/hotel_reports/hotels')
      .then(response => (this.hotels = response.data))
    },
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
.filter {
  display: flex;
}

.filter .filter__single {
  flex: 1;
  display: flex;
  justify-content: center;
}

.filter .filter__single .filter__single__select {
  width: 200px;
}

.filter .filter__twice {
  flex: 2;
  display: flex;
}

.filter .filter__twice .filter__twice__item {
  flex: 1;
  display: flex;
  justify-content: center;
  column-gap: 15px;
}

@media (max-width: 800px) {
  .filter {
    flex-direction: column;
    row-gap: 15px;
  }

  .filter .filter__single {
    justify-content: left;
  }

  .filter .filter__twice .filter__twice__item {
    justify-content: left;
  }
}

@media (max-width: 480px) {
  .filter .filter__twice {
    flex-direction: column;
    row-gap: 15px;
  }
}
</style>
