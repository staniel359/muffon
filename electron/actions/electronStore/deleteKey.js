import electronStore from '../../plugins/electronStore.js'

export default function (
  key
) {
  return electronStore.delete(
    key
  )
}
