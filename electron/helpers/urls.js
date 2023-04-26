import {
  isDevelopment
} from '#/helpers/utils'
import {
  productionPath
} from '#/helpers/paths'

const developmentUrl =
  'http://localhost:3000/'

const productionUrl =
  `file://${productionPath}`

export const baseUrl = (
  isDevelopment
    ? developmentUrl
    : productionUrl
)

export const homepageUrl =
  'https://muffon.netlify.app'
