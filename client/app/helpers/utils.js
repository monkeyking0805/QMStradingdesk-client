import moment from 'moment'

const sortDropdown = (arrayList) => {
  return arrayList.sort((a, b) => {
    if (a.label < b.label) { return -1 }
    if (a.label > b.label) { return 1 }
    return 0
  })
}
// Transform Response to dropdown option and order by alphabet
const dropdownOptionsTransform = (itemList, isUnitAsset = false) => {
  if (!Array.isArray(itemList)) {
    return []
  }
  return sortDropdown(itemList.map(item => {
    let label = item.name
    if (isUnitAsset && item.duration) {
      label += ' - ' + item.duration
    }
    return {
      key: item.id,
      value: item.id,
      label
    }
  }))
}

const dropdownSingleOptionsTransform = (itemList) => {
  if (!Array.isArray(itemList) || itemList.length === 0) {
    if (itemList && itemList.name && itemList.id) {
      return {
        key: itemList.id,
        value: itemList.id,
        label: itemList.name
      }
    }
    return null
  }
  return {
    key: itemList[0].id,
    value: itemList[0].id,
    label: itemList[0].name
  }
}

// Remove dubplicate result and order by alphabet
const distinctOptions = (selectedOptions, dropdownOptions) => {
  return sortDropdown(dropdownOptions.filter(dropdown => {
    return !selectedOptions.find(selectOption => {
      return dropdown.key === selectOption.key
    })
  }))
}

const displayDate = (startDate, endDate, dateFormat) => {
  const momentStartDate = moment(startDate).utc()
  const momentEndDate = moment(endDate).utc()
  if (momentStartDate.isSame(momentEndDate, 'date')) {
    return momentStartDate.format(dateFormat)
  }
  return `${momentStartDate.format(dateFormat)} - ${momentEndDate.format(dateFormat)}`
}

const displaySingleDate = (date, dateFormat) => {
  return moment(date).utc().format(dateFormat)
}

const displayCurrencyFormat = (amount) => {
  // return `$${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

const extractValues = (options) => options.map((option) => option.value)

const transformSearchCriteria = (filters) => {
  const init = {
    code_id: extractValues(filters.sportCodes || []),
    brand_category_id: extractValues(filters.brandCategories || []),
    start_date: filters.startDate || null,
    end_date: filters.endDate || null,
    region_id: extractValues(filters.regions || []),
    club_id: extractValues(filters.clubs || []),
    venue_id: extractValues(filters.venues || []),
    asset_type_id: extractValues(filters.assetTypes || []),
    only_available_asset: filters.onlyAvailable
  }
  const result = {}
  Object.keys(init).forEach(k => {
    if ((Array.isArray(init[k]) && init[k].length > 0) || (!Array.isArray(init[k]) && init[k])) {
      result[k] = init[k]
    }
  })
  return result
}

const tableDisplayLabel = ({ current, itemsPerPage, count }) => {
  // If total item is 0 just return 0
  if (count === 0) return 'No data available'
  const countMaximumItemInpage = current * itemsPerPage
  return `${1 + ((current - 1) * itemsPerPage)} - ${(count < countMaximumItemInpage) ? count : countMaximumItemInpage} of ${count}`
}

export {
  dropdownOptionsTransform,
  dropdownSingleOptionsTransform,
  distinctOptions,
  displayCurrencyFormat,
  displayDate,
  extractValues,
  transformSearchCriteria,
  tableDisplayLabel,
  displaySingleDate
}
