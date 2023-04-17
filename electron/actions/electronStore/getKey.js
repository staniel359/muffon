import electronStore from '#/plugins/electronStore'

export default function (
  key
) {
  return electronStore.get(
    key
  )
}
