import electronStore from '../../plugins/electronStore.js'

export default function getKey (
  key
) {
  return electronStore.get(
    key
  )
}
