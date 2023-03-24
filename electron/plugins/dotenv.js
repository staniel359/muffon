import dotenv from 'dotenv'
import {
  formatFileRootPath
} from '../paths.js'

export default function setup () {
  const envFilePath =
    formatFileRootPath(
      '.env'
    )

  const options = {
    path: envFilePath
  }

  dotenv.config(
    options
  )
}
