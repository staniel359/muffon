import {
  ipcRenderer
} from 'electron'

export default async function (
  key,
  item
) {
  const historyKey = `history.${key}`

  const history =
    await ipcRenderer.invoke(
      'get-electron-store-key',
      historyKey
    )

  const isNewItem = (
    item && (
      item !== history[0]
    )
  )

  if (isNewItem) {
    const newHistory = [
      item,
      ...history
    ]

    const data = {
      [historyKey]: newHistory
    }

    const dataFormatted =
      JSON.stringify(
        data
      )

    ipcRenderer.invoke(
      'set-electron-store-data',
      dataFormatted
    )
  }
}
