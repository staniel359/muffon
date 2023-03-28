import electronStore from '../../plugins/electronStore.js'

export default function setData (
  data
) {
  return electronStore.set(
    data
  )
}
