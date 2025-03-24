import {
  isDevelopment
} from '../../helpers/utils.js'

export default function (
  view
) {
  if (!isDevelopment) { return }

  const options = {
    mode: 'detach'
  }

  view
    .webContents
    .openDevTools(
      options
    )
}
