import {
  isDevelopment
} from '#/utils'
import {
  productionPath
} from '#/paths'

const developmentUrl =
  'http://localhost:3000/'

const productionUrl =
  `file://${productionPath}`

export const baseUrl = (
  isDevelopment
    ? developmentUrl
    : productionUrl
)
