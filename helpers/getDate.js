function date(input) {
  var date = input.getDate()
  var month = input.getMonth()
  var year = input.getFullYear()
  var bod = year + ' - ' + month + ' - ' + date
  return bod
}

module.exports = date
