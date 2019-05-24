export default {
  filters: {
    toDateFormat: function(time) {
      if (!time) return ''
      return new Date(time).toLocaleString()
    }
  }
}
