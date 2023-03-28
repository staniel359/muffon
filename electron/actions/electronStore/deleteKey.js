import electronStore from '../../plugins/electronStore.js'

export default function deleteKey (
  key
) {
  return electronStore.delete(
    key
  )
}
