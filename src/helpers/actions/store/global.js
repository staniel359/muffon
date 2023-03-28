import {
  ipcRenderer
} from 'electron'

export function update (
  data,
  {
    isSave = true
  } = {}
) {
  const dataFormatted =
    JSON.stringify(
      data
    )

  return ipcRenderer.invoke(
    'update-store',
    dataFormatted,
    {
      isSave
    }
  )
}
