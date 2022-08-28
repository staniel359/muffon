const updateStore = require(
  '../../actions/store/update'
)

function handleUpdateStore (
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

module.exports = {
  handleUpdateStore
}
