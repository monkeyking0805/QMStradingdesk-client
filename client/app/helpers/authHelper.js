/* global localStorage */
const getTokenHeader = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`
  }
}

module.exports = {
  getTokenHeader
}
