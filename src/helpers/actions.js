import { ipcRenderer } from 'electron'
import { camelCase } from 'camel-case'
import store from '*/plugins/store'
import i18n from '*/plugins/i18n'
import { addFormFieldError } from '*/helpers/actions/plugins/semantic'

export const updateStore = data => {
  return ipcRenderer.invoke(
    'update-store',
    JSON.stringify(data)
  )
}

export const updateTab = data => {
  const { tabId } = store.state.layout

  ipcRenderer.send(
    'update-tab',
    { tabId, data }
  )
}

export const setPlayerPlaying = value => {
  updateStore({
    'player.playing': value
  })

  const handleUpdateStore = () => {
    store.dispatch(
      'audio/setIsAutoplay',
      true
    )
  }

  updateStore({
    'audio.isAutoplay': false
  }).then(
    handleUpdateStore
  )
}

export const addFormErrors = ({ error, fields, form }) => {
  const { errors } = error.response.data

  const addFieldsError = errorData => {
    const addFieldError = field => {
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
