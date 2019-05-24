export default {
  filters: {
    toDateFormat: function(time) {
      const splited = new Date(time).toISOString().split('T')
      return `${splited[0]} ${splited[1].slice(0, 5)}`
    }
  }
}
