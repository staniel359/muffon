import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/en'
import 'dayjs/locale/it'
import 'dayjs/locale/ru'
import store from '*/plugins/store'
import i18n from '*/plugins/i18n'

export function mainModalOptions (
  {
    onShow,
    onVisible
  }
) {
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

export function mainLoaderOptions () {
  return {
    closable: false,
    duration: 0
  }
}

export function mainHistoryInputOptions (
  {
    source,
    onSelect
  }
) {
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

export function mainSidebarOptions (
  {
    onShow,
    onVisible,
    onHide
  } = {}
) {
  return {
    closable: false,
    dimPage: false,
    onVisible,
    onShow,
    onHide
  }
}

export function mainSeekerOptions (
  {
    onMove,
    onChange
  } = {}
) {
  return {
    max: 100,
    step: 0.25,
    onMove,
    onChange
  }
}

export function mainVolumeSeekerOptions (
  {
    start
  } = {}
) {
  return {
    max: 1,
    step: 0.01,
    start
  }
}

export function mainTransparencySeekerOptions (
  {
    start
  } = {}
) {
  return {
    max: 100,
    step: 10,
    start
  }
}

export function mainPopupOptions () {
  return {
    duration: 0,
    position: 'top center',
    variation: 'basic',
    closable: false,
    hoverable: true,
    inline: true
  }
}

export function sourcePopupOptions (
  {
    isDarkMode
  }
) {
  const variation = [
    'basic small',
    (
      isDarkMode &&
        'inverted'
    )
  ].filter(
    e => e
  ).join(
    ' '
  )

  return {
    duration: 0,
    position: 'top center',
    variation,
    className: {
      popup: 'ui popup main-popup'
    }
  }
}

export function mainDropdownOptions (
  {
    onChange,
    action
  } = {}
) {
  const {
    visibleContext
  } = store.state.layout

  const context = (
    visibleContext || 'body'
  )

  return {
    forceSelection: false,
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

export function mainCheckboxOptions (
  {
    onChecked,
    onUnchecked
  } = {}
) {
  return {
    onChecked,
    onUnchecked
  }
}

export function mainEmbedOptions (
  {
    videoId,
    placeholder
  }
) {
  const url =
    `https://www.youtube.com/embed/${videoId}`

  return {
    url,
    placeholder,
    parameters: {
      fs: 0
    }
  }
}

export function loginFormOptions (
  {
    onSuccess
  }
) {
  const emptyEmailPrompt =
    i18n.global.t(
      'forms.errors.empty.email'
    )

  const emptyPasswordPrompt =
    i18n.global.t(
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

export function passwordResetFormOptions (
  {
    onSuccess
  }
) {
  const emptyEmailPrompt =
    i18n.global.t(
      'forms.errors.empty.email'
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
      }
    },
    onSuccess
  }
}

export function profileCreateFormOptions (
  {
    onSuccess
  }
) {
  const emptyEmailPrompt =
    i18n.global.t(
      'forms.errors.empty.email'
    )

  const emptyPasswordPrompt =
    i18n.global.t(
      'forms.errors.empty.password'
    )

  const emptyPasswordConfirmationPrompt =
    i18n.global.t(
      'forms.errors.empty.passwordConfirmation'
    )

  const emptyNicknamePrompt =
    i18n.global.t(
      'forms.errors.empty.nickname'
    )

  const emptyLegalPrompt =
    i18n.global.t(
      'forms.errors.empty.legal'
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
        identifier: 'password-confirmation',
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
      },
      legal: {
        identifier: 'legal',
        rules: [
          {
            type: 'empty',
            prompt: emptyLegalPrompt
          }
        ]
      }
    },
    onSuccess
  }
}

export function profileUpdateFormOptions (
  {
    onSuccess
  }
) {
  const emptyEmailPrompt =
    i18n.global.t(
      'forms.errors.empty.email'
    )

  const emptyPasswordConfirmationPrompt =
    i18n.global.t(
      'forms.errors.empty.passwordConfirmation'
    )

  const emptyNicknamePrompt =
    i18n.global.t(
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
        identifier: 'password-confirmation',
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

export function passwordUpdateFormOptions (
  {
    onSuccess
  }
) {
  const emptyPasswordResetCodePrompt =
    i18n.global.t(
      'forms.errors.empty.passwordResetCode'
    )

  const emptyPasswordPrompt =
    i18n.global.t(
      'forms.errors.empty.password'
    )

  const emptyPasswordConfirmationPrompt =
    i18n.global.t(
      'forms.errors.empty.passwordConfirmation'
    )

  return {
    duration: 0,
    inline: true,
    fields: {
      passwordResetCode: {
        identifier: 'password-reset-code',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordResetCodePrompt
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
        identifier: 'password-confirmation',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordConfirmationPrompt
          }
        ]
      }
    },
    onSuccess
  }
}

export function playlistFormOptions (
  {
    onSuccess
  }
) {
  const emptyTitlePrompt =
    i18n.global.t(
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

export function postFormOptions (
  {
    onSuccess
  }
) {
  return {
    onSuccess
  }
}

export function messageFormOptions (
  {
    onSuccess
  }
) {
  return {
    onSuccess
  }
}

export function communityFormOptions (
  {
    onSuccess
  }
) {
  const emptyTitlePrompt =
    i18n.global.t(
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

export function birthdateCalendarOptions () {
  const {
    language
  } = store.state.profile

  dayjs.extend(
    localeData
  )

  dayjs.locale(
    language
  )

  const days = dayjs.weekdaysMin()
  const months = dayjs.months()
  const monthsShort = dayjs.monthsShort()

  const today = new Date()

  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()

  const minDate = new Date(
    year - 100,
    month,
    day
  )

  const maxDate = new Date(
    year,
    month,
    day
  )

  return {
    firstDayOfWeek: 1,
    monthFirst: false,
    startMode: 'year',
    type: 'date',
    popupOptions: {
      position: 'top left'
    },
    text: {
      days,
      months,
      monthsShort
    },
    minDate,
    maxDate
  }
}

export function mainProgressOptions (
  {
    onChange,
    onSuccess
  }
) {
  return {
    className: {
      success: 'active'
    },
    onChange,
    onSuccess
  }
}

export function mainAccordionOptions (
  {
    onOpen,
    onClose
  }
) {
  return {
    duration: 0,
    onOpen,
    onClose
  }
}
