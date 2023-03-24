import {
  isDevelopment
} from './utils.js'
import {
  productionPath
} from './paths.js'

const developmentUrl =
  'http://localhost:3000/'

const productionUrl =
  `file://${productionPath}`

export const baseUrl = (
  isDevelopment
    ? developmentUrl
    : productionUrl
)
