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

export const releasesUrl =
  'https://api.github.com/repos/staniel359/muffon/releases/latest'
