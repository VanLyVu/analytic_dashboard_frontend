import Vue from 'vue'
import Router from 'vue-router'
import HotelReport from '@/components/HotelReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HotelReport',
      component: HotelReport
    }
  ]
})
