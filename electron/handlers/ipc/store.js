import updateStore from '#/actions/store/update'

export function handleUpdateStore (
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
