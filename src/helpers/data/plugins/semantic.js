import store from '@/plugins/store'
import i18n from '@/plugins/i18n'
import moment from 'moment-timezone'

export function mainModalOptions (
  {
    isMultiple,
    onShow,
    onVisible
  }
) {
  return {
    autofocus: false,
    allowMultiple: isMultiple,
    duration: 150,
    transition: 'fade',
    dimmerSettings: {
      duration: 150
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
  const step = 10

  function interpretLabel (
    value
  ) {
    if (value % 2 === 0) {
      return `${value * step}%`
    } else {
      return ' '
    }
  }

  return {
    max: 100,
    step,
    start,
    smooth: true,
    interpretLabel
  }
}

export function mainScrobblePercentSeekerOptions (
  {
    start
  } = {}
) {
  const step = 25

  return {
    min: 25,
    max: 75,
    step,
    start,
    smooth: true,
    autoAdjustLabels: false,
    interpretLabel: (
      value
    ) => {
      return `${(value + 1) * step}%`
    }
  }
}

export function mainPopupOptions () {
  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    closable: false,
    hoverable: true
  }
}

export function sourcePopupOptions () {
  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic small'
  }
}

export function artistPopupOptions (
  {
    html,
    onShow
  }
) {
  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    hoverable: true,
    lastResort: true,
    className: {
      popup: 'ui popup main-artist-popup'
    },
    delay: {
      show: 750,
      hide: 150
    },
    html,
    onShow
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

  return {
    forceSelection: false,
    on: 'hover',
    fullTextSearch: 'exact',
    duration: 150,
    context: visibleContext,
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

export function mainVideoOptions (
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

export function birthdateCalendarOptions (
  {
    startDate
  }
) {
  const {
    language
  } = store.state.profile

  moment.locale(
    language
  )

  const days =
    moment.weekdaysShort()
  const months =
    moment.months()
  const monthsShort =
    moment.monthsShort()

  const minDate =
    moment().subtract(
      100,
      'years'
    ).toDate()

  const maxDate = moment().toDate()

  const initialDate = (
    startDate &&
      moment(
        startDate
      ).toDate()
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
    maxDate,
    initialDate
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
