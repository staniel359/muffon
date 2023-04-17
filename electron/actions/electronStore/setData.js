import electronStore from '#/plugins/electronStore'

export default function (
  data
) {
  return electronStore.set(
    data
  )
}
