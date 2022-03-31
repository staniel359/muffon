import store from '*/plugins/store'
import i18n from '*/plugins/i18n'

export const mainModalOptions = ({ onShow, onVisible } = {}) => {
  return {
    autofocus: false,
    allowMultiple: true,
    duration: 100,
    transition: 'fade',
    dimmerSettings: {
      duration: 100
    },
    onShow,
    onVisible
  }
}

export const mainLoaderOptions = () => {
  return {
    closable: false,
    duration: 0
  }
}

export const mainHistoryInputOptions = ({ source, onSelect }) => {
  return {
    maxResults: 20,
    minCharacters: 0,
    duration: 0,
    searchDelay: 0,
    cache: false,
    showNoResults: false,
    source,
    onSelect
  }
}

export const mainSidebarOptions = ({ onShow, onVisible, onHide } = {}) => {
  return {
    closable: false,
    dimPage: false,
    onVisible,
    onShow,
    onHide
  }
}

export const mainSeekerOptions = ({ onMove, onChange } = {}) => {
  return {
    max: 100,
    step: 0.25,
    onMove,
    onChange
  }
}

export const mainVolumeSeekerOptions = ({ start } = {}) => {
  return {
    max: 1,
    step: 0.01,
    start
  }
}

export const mainPopupOptions = () => {
  return {
    duration: 0,
    position: 'top center',
    variation: 'basic',
    closable: false,
    hoverable: true,
    inline: true
  }
}

export const sourcePopupOptions = ({ isDarkMode }) => {
  const variation = [
    'basic small',
    (isDarkMode && 'inverted')
  ].filter(e => e).join(' ')

  return {
    duration: 0,
    position: 'top center',
    variation,
    className: {
      popup: 'ui popup main-popup'
    }
  }
}

export const mainDropdownOptions = ({ onChange, action } = {}) => {
  const { visibleContext } = store.state.layout

  const context = visibleContext || 'body'

  return {
    on: 'hover',
    duration: 150,
    context,
    delay: {
      show: 0,
      hide: 150
    },
    onChange,
    action
  }
}

export const mainCheckboxOptions = ({ onChecked, onUnchecked } = {}) => {
  return {
    onChecked,
    onUnchecked
  }
}

export const mainEmbedOptions = ({ videoId, placeholder }) => {
  const url = `https://www.youtube.com/embed/${videoId}`

  return {
    url,
    placeholder,
    parameters: {
      fs: 0
    }
  }
}

export const loginFormOptions = ({ onSuccess }) => {
  const emptyEmailPrompt = i18n.global.t(
    'forms.errors.empty.email'
  )
  const emptyPasswordPrompt = i18n.global.t(
    'forms.errors.empty.password'
  )

  return {
    duration: 0,
    inline: true,
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: emptyEmailPrompt
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordPrompt
          }
        ]
      }
    },
    onSuccess
  }
}

export const profileCreateFormOptions = ({ onSuccess }) => {
  const emptyEmailPrompt = i18n.global.t(
    'forms.errors.empty.email'
  )
  const emptyPasswordPrompt = i18n.global.t(
    'forms.errors.empty.password'
  )
  const emptyPasswordConfirmationPrompt = i18n.global.t(
    'forms.errors.empty.passwordConfirmation'
  )
  const emptyNicknamePrompt = i18n.global.t(
    'forms.errors.empty.nickname'
  )

  return {
    duration: 0,
    inline: true,
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: emptyEmailPrompt
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordPrompt
          }
        ]
      },
      passwordConfirmation: {
        identifier: 'passwordConfirmation',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordConfirmationPrompt
          }
        ]
      },
      nickname: {
        identifier: 'nickname',
        rules: [
          {
            type: 'empty',
            prompt: emptyNicknamePrompt
          }
        ]
      }
    },
    onSuccess
  }
}

export const profileUpdateFormOptions = ({ onSuccess }) => {
  const emptyEmailPrompt = i18n.global.t(
    'forms.errors.empty.email'
  )
  const emptyPasswordConfirmationPrompt = i18n.global.t(
    'forms.errors.empty.passwordConfirmation'
  )
  const emptyNicknamePrompt = i18n.global.t(
    'forms.errors.empty.nickname'
  )

  return {
    duration: 0,
    inline: true,
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: emptyEmailPrompt
          }
        ]
      },
      password: {
        identifier: 'password',
        optional: true
      },
      passwordConfirmation: {
        identifier: 'passwordConfirmation',
        depends: 'password',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordConfirmationPrompt
          }
        ]
      },
      nickname: {
        identifier: 'nickname',
        rules: [
          {
            type: 'empty',
            prompt: emptyNicknamePrompt
          }
        ]
      }
    },
    onSuccess
  }
}

export const playlistFormOptions = ({ onSuccess }) => {
  const emptyTitlePrompt = i18n.global.t(
    'forms.errors.empty.title'
  )

  return {
    duration: 0,
    inline: true,
    fields: {
      title: {
        identifier: 'title',
        rules: [
          {
            type: 'empty',
            prompt: emptyTitlePrompt
          }
        ]
      }
    },
    onSuccess
  }
}

export const postFormOptions = ({ onSuccess }) => {
  return { onSuccess }
}

export const messageFormOptions = ({ onSuccess }) => {
  return { onSuccess }
}

export const birthdateCalendarOptions = () => {
  const today = new Date()
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth() + 1,
    today.getDate()
  )
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  )

  return {
    type: 'date',
    monthFirst: false,
    startMode: 'year',
    minDate,
    maxDate
  }
}

export const mainProgressOptions = ({ formatActive, onSuccess }) => {
  return {
    text: {
      active: formatActive(
        {
          value: '{value}',
          total: '{total}'
        }
      )
    },
    onSuccess
  }
}

export const mainAccordionOptions = ({ onOpen }) => {
  return {
    duration: 0,
    onOpen
  }
}
