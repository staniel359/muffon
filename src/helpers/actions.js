import {
  ipcRenderer
} from 'electron'
import {
  camelCase
} from 'camel-case'
import store from '*/plugins/store'
import i18n from '*/plugins/i18n'
import {
  addFormFieldError
} from '*/helpers/actions/plugins/semantic'

export function updateStore (
  data,
  {
    isSave = true
  } = {}
) {
  return ipcRenderer.invoke(
    'update-store',
    JSON.stringify(
      data
    ),
    {
      isSave
    }
  )
}

export function updateTab (
  data
) {
  const {
    tabId
  } = store.state.layout

  ipcRenderer.send(
    'update-tab',
    {
      tabId,
      data
    }
  )
}

export function setPlayerPlaying (
  value
) {
  updateStore(
    {
      'player.playing': value
    }
  )

  function handleUpdateStore () {
    store.dispatch(
      'audio/setIsAutoplay',
      true
    )
  }

  updateStore(
    {
      'audio.isAutoplay': false
    },
    {
      isSave: false
    }
  ).then(
    handleUpdateStore
  )
}

export function addFormErrors (
  {
    error,
    fields,
    form
  }
) {
  const {
    errors
  } = error.response.data

  function addFieldsError (
    errorData
  ) {
    function addFieldError (
      field
    ) {
      if (errorData[field]) {
        const errorKey = camelCase(
          errorData[field]
        )
        const fieldKey = camelCase(
          field
        )

        const error = i18n.global.t(
          `forms.errors.${errorKey}.${fieldKey}`
        )

        addFormFieldError(
          form,
          fieldKey,
          error
        )
      }
    }

    fields.forEach(
      addFieldError
    )
  }

  errors.forEach(
    addFieldsError
  )
}
