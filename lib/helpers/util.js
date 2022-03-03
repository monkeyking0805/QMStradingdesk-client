const debug = require('debug')('qms-tradingdesk-client:helpers:utils')

const transformRequestQuery = (filters) => {
  debug(transformRequestQuery.name)
  const filtersArray = []
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      filtersArray.push(`${key}=${filters[key]}`)
    }
  })
  if (filtersArray.length > 0) {
    return `?${filtersArray.join('&')}`
  }
  return ''
}

/*
  Transform dropdown array
  Accept 2 type of dropdown array
 1. Array of object
 2. Array of numeric
*/
const transformRequestDropdownArray = (arrayRequest) => {
  if ((arrayRequest && Array.isArray(arrayRequest))) {
    if (arrayRequest.every((element) => typeof element === 'number')) {
      return arrayRequest
    }
    return arrayRequest.map((item) => item.value)
  }

  return []
}

module.exports = {
  transformRequestQuery,
  transformRequestDropdownArray
}
