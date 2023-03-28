import electronStore from '../../plugins/electronStore.js'

export default function getData () {
  return electronStore.store
}
