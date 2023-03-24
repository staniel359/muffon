import updateStore from '../../actions/store/update.js'

export function handleUpdateStore (
  _,
  data,
  {
    isSave
  }
) {
  updateStore(
    data,
    {
      isSave
    }
  )
}
