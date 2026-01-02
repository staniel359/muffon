import profileStore from '@/stores/profile'
import {
  AES,
  enc
} from 'crypto-js'
import {
  date as formatDate
} from '@/helpers/formatters/dateTime'
import {
  shareEncryptionKey,
  systemName
} from '@/helpers/data/env'

export {
  v4 as generateKey
} from 'uuid'

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

  const maxIndex = (
    array.length - 1
  )

  for (
    let i = maxIndex;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (
        i + 1
      )
    );

    [
      array[i],
      array[j]
    ] = [
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

  const profileId =
    profileStore().id

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
    newString !== oldString
  )
}

export function isStringChanged (
  newValue,
  oldValue
) {
  const newString =
    newValue
      .trim()
      .toLowerCase()

  const oldString =
    oldValue
      .trim()
      .toLowerCase()

  return (
    newString !== oldString
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
    const firstCreated =
      formatDate(
        first.created
      )

    const secondCreated =
      formatDate(
        second.created
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

export function getObjectKeysWithTrueValues (
  value
) {
  return Object.entries(
    value
  ).filter(
    array => array[1]
  ).map(
    array => array[0]
  )
}

export function isMiddleClick (
  event
) {
  return (
    event.which === 2
  )
}

export function sanitizeString (
  string
) {
  return window
    .mainProcess
    .sanitizeString(
      string
    )
}

export const isWindows = (
  systemName === 'windows'
)

export const isMacos = (
  systemName === 'macos'
)

export const isLinux = (
  systemName === 'linux'
)

export function wait (
  milliseconds
) {
  return new Promise(
    resolve => {
      return setTimeout(
        resolve,
        milliseconds
      )
    }
  )
}
