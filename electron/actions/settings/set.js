import electronStore from '../../plugins/electronStore.js'

export default function (
  data
) {
  return electronStore.set(
    data
  )
}
