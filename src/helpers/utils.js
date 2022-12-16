import profileStore from '@/stores/profile'
import {
  AES,
  enc
} from 'crypto-js'
import moment from 'moment-timezone'

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
  const valueFormatted =
    parseInt(
      value
    )

  const profileId = profileStore().id

  const profileIdFormatted =
    parseInt(
      profileId
    )

  return (
    valueFormatted ===
      profileIdFormatted
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

export const shareEncryptionKey =
  process.env.VUE_APP_SHARE_ENCRYPTION_KEY

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
        shareEncryptionKey
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

export function sortByCreated (
  {
    collection,
    order = 'createdDesc'
  }
) {
  function sortItems (
    first,
    second
  ) {
    function formatCreated (
      item
    ) {
      return moment(
        item.created || 0
      ).toDate()
    }

    const firstCreated =
      formatCreated(
        first
      )

    const secondCreated =
      formatCreated(
        second
      )

    switch (order) {
      case 'createdDesc':
        return (
          secondCreated -
            firstCreated
        )
      case 'createdAsc':
        return (
          firstCreated -
            secondCreated
        )
    }
  }

  return [
    ...collection
  ].sort(
    sortItems
  )
}
