const {
  isDevelopment
} = require(
  './utils'
)
const {
  productionPath
} = require(
  './paths'
)

const baseUrl = isDevelopment
  ? 'http://localhost:3000/'
  : `file://${productionPath}`

module.exports = {
  baseUrl
}
