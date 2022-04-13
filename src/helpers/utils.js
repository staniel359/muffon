import store from '*/plugins/store'

export { v4 as generateKey } from 'uuid'

export function getDistinctArray (
  value
) {
  return [
    ...new Set(
      value
    )
  ]
}

export function shuffleArray (
  value
) {
  const array = [
    ...value
  ]
  const maxIndex = array.length - 1

  for (let i = maxIndex; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [
      array[i],
      array[j]
    ] =
      [
        array[j],
        array[i]
      ]
  }

  return array
}

export function isCurrentProfile (
  value
) {
  const profileId =
    store.state.profile.info.id

  return (
    parseInt(
      value
    ) ===
      parseInt(
        profileId
      )
  )
}
