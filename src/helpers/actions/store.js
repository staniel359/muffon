import i18n from '#/plugins/i18n'
import {
  ipcRenderer
} from 'electron'
import {
  snakeCase
} from 'snake-case'
import {
  camelCase
} from 'camel-case'

function getStore (
  {
    name
  }
) {
  const ignoredNames = [
    'history'
  ]

  const isGetStore =
    !ignoredNames.includes(
      name
    )

  if (isGetStore) {
    return require(
      `@/stores/${name}`
    ).default
  }
}

function getAction (
  {
    name,
    key
  }
) {
  const store =
    getStore(
      {
        name
      }
    )

  if (store) {
    const keyFormatted =
      snakeCase(
        key
      )

    const actionName =
      camelCase(
        `set-${keyFormatted}`
      )

    return store()[
      actionName
    ]
  }
}

function callAction (
  {
    name,
    key,
    value
  }
) {
  const action =
    getAction(
      {
        name,
        key
      }
    )

  if (action) {
    action(
      value
    )
  }
}

export function updateLocal (
  nameWithKey,
  value
) {
  const [
    name,
    key
  ] = nameWithKey.split(
    '.'
  )

  callAction(
    {
      name,
      key,
      value
    }
  )

  const isChangeLanguage = (
    nameWithKey === 'profile.language'
  )

  if (isChangeLanguage) {
    i18n.global.locale = value
  }
}

export function updateGlobal (
  data,
  {
    isSave = true
  } = {}
) {
  const dataFormatted =
    JSON.stringify(
      data
    )

  return ipcRenderer.invoke(
    'update-store',
    dataFormatted,
    {
      isSave
    }
  )
}
