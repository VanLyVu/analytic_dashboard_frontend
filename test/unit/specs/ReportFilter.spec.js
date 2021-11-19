import ReportFilter from '@/components/ReportFilter'
import { shallowMount } from '@vue/test-utils'

describe('ReportFilter.vue', () => {
  let wrapper
  let sampleHotelsData = [
    {
      id: 1,
      name: 'Hotel1'
    },
    {
      id: 2,
      name: 'Hotel2'
    }
  ]

  let defaultFilter = {
    hotel_id: null,
    date_from: null,
    date_to: null,
    is_clear: true
  }

  beforeEach(() => {
    wrapper = shallowMount(ReportFilter)
  })

  it('should render elements', () => {
    expect(wrapper.find('input[name=date_from]').exists()).toBe(true)
    expect(wrapper.find('input[name=date_to]').exists()).toBe(true)
    expect(wrapper.find('select[name=hotel_id]').exists()).toBe(true)
  })

  it('should set empty default value to elements', () => {
    expect(wrapper.vm.$el.querySelector('input[name=date_from]').value).toEqual('')
    expect(wrapper.vm.$el.querySelector('input[name=date_to]').value).toEqual('')
    expect(wrapper.vm.$el.querySelector('select[name=hotel_id]').value).toEqual('')
  })

  it('should populate data to select', () => {
    wrapper = shallowMount(ReportFilter, {
      data () {
        return {
          hotels: sampleHotelsData,
          filter: defaultFilter
        }
      }
    })

    const options = wrapper.vm.$el.querySelector('select')
    expect(options).toHaveLength(3)
    expect(options[0].value).toEqual('')
    expect(options[0].textContent).toContain('Select Hotel')
    expect(options[1].value).toEqual('1')
    expect(options[1].textContent).toContain('Hotel1')
    expect(options[2].value).toEqual('2')
    expect(options[2].textContent).toContain('Hotel2')
  })

  it('should call api to get hotels', () => {
    // TODO
  })

  it('should trigger filtered event to parent when select hotel and send correct hotel_id', () => {
    // TODO
  })

  it('should trigger filtered event to parent when select date from and send corrent date_from', () => {
    // TODO
  })

  it('should trigger filtered event to parent when select date to and send correct date_to', () => {
    // TODO
  })

  it('should set isClear= true when select empty hotel', () => {
    // TODO
  })

  it('should set isClear= true when select empty or invalid date from', () => {
    // TODO
  })

  it('should set isClear= true when select empty or invalid date to', () => {
    // TODO
  })

  it('should set isClear= false when select all valid filter data', () => {
    // TODO
  })
})
