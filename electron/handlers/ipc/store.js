import updateStore from '../../actions/store/update.js'

export function handleCallUpdateStore (
  _,
  data,
  {
    isSave
  }
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  updateStore(
    dataFormatted,
    {
      isSave
    }
  )
}
