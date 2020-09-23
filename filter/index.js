import coreFilterGroup from '_app/filter/filter-core.js'
import customFilterGroup from '_app/filter/fliter-custom.js'

const filters = coreFilterGroup.concat(customFilterGroup)
const importFilter = (Vue) => {

  filters.forEach((filter) => {
    Vue.filter(filter.filterName, filter.filterFn)
  })
}

export default importFilter
