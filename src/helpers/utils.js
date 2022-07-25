import store from '*/plugins/store'
import {
  AES,
  enc
} from 'crypto-js'

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
    store.getters['profile/id']

  return (
    parseInt(
      value
    ) ===
      parseInt(
        profileId
      )
  )
}

export function isObjectChanged (
  newValue,
  oldValue
) {
  const newString =
    JSON.stringify(
      newValue
    )

  const oldString =
    JSON.stringify(
      oldValue
    )

  return (
    newString !==
      oldString
  )
}

export function isStringChanged (
  newValue,
  oldValue
) {
  const newString =
    newValue.trim().toLowerCase()

  const oldString =
    oldValue.trim().toLowerCase()

  return (
    newString !==
      oldString
  )
}

export function decryptTextWithLinks (
  text
) {
  function decryptMatchedString (
    _,
    matchedString
  ) {
    try {
      return AES.decrypt(
        matchedString,
        'secret'
      ).toString(
        enc.Utf8
      )
    } catch {
      return ''
    }
  }

  return text.replace(
    /(?<=\[link\])(.+?)(?=\[\/link\])/g,
    decryptMatchedString
  )
}
