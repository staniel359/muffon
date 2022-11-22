import store from '@/plugins/store'
import i18n from '@/plugins/i18n'
import moment from 'moment-timezone'
import axios from 'axios'

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
  const {
    isDarkMode
  } = store.state.layout

  const variation = (
    !isDarkMode && 'inverted'
  )

  return {
    closable: false,
    duration: 0,
    variation
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
    onShow,
    onVisible,
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

export function volumePopupOptions () {
  return {
    position: 'top center',
    transition: 'fade up',
    variation: 'basic',
    closable: false,
    hoverable: true,
    delay: {
      show: 0,
      hide: 150
    }
  }
}

export function sourcePopupOptions (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  const {
    isDarkMode
  } = store.state.layout

  const variation = isDarkMode
    ? 'basic inverted'
    : 'basic'

  return {
    delay: 0,
    position: 'top center',
    transition: 'fade up',
    className: {
      popup: className
    },
    html,
    variation
  }
}

export function artistPopupOptions (
  {
    html,
    onShow,
    onHide
  }
) {
  const className =
    'ui popup main-popup main-artist-popup'

  const {
    isDarkMode
  } = store.state.layout

  const variation = isDarkMode
    ? 'basic inverted'
    : 'basic'

  return {
    position: 'top center',
    transition: 'fade up',
    hoverable: true,
    lastResort: true,
    className: {
      popup: className
    },
    delay: {
      show: 750,
      hide: 150
    },
    html,
    variation,
    onShow,
    onHide
  }
}

export function annotationPopupOptions (
  {
    html,
    onShow
  }
) {
  const className =
    'ui popup main-popup main-annotation-popup'

  const {
    isDarkMode
  } = store.state.layout

  const variation = isDarkMode
    ? 'basic inverted'
    : 'basic'

  return {
    position: 'top center',
    transition: 'fade up',
    variation,
    hoverable: true,
    lastResort: true,
    className: {
      popup: className
    },
    delay: {
      show: 500
    },
    html,
    onShow
  }
}

export function emojiPopupOptions () {
  return {
    position: 'right center',
    transition: 'fade up',
    variation: 'basic',
    hoverable: true,
    delay: {
      show: 0,
      hide: 150
    }
  }
}

export function mainDropdownOptions (
  {
    isSelection,
    onChange
  } = {}
) {
  const {
    visibleContext
  } = store.state.layout

  const message = {
    noResults: i18n.global.t(
      'errors.notFound.header'
    )
  }

  const transition = (
    isSelection ? 'auto' : 'fade up'
  )

  return {
    on: 'hover',
    context: (
      visibleContext || 'body'
    ),
    delay: {
      show: 0,
      hide: 150
    },
    message,
    transition,
    onChange
  }
}

export function optionsDropdownOptions () {
  const {
    visibleContext
  } = store.state.layout

  return {
    action: 'nothing',
    on: 'hover',
    transition: 'fade up',
    context: visibleContext,
    delay: {
      show: 0,
      hide: 150
    }
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
    isAutoplay
  }
) {
  const url =
    `https://www.youtube.com/embed/${videoId}`

  const {
    language
  } = store.state.profile

  return {
    autoplay: isAutoplay,
    parameters: {
      fs: 0,
      hl: language
    },
    url
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

export function mainSearchOptions (
  {
    onResponse,
    url,
    fields,
    onSelect
  }
) {
  const {
    baseURL
  } = axios.defaults

  const apiSettings = {
    base: baseURL,
    onResponse,
    url
  }

  const noResultsHeader =
    i18n.global.t(
      'errors.notFound.header'
    )

  const noResults =
    i18n.global.t(
      'errors.notFound.content'
    )

  const serverError =
    i18n.global.t(
      'errors.internalServer.header'
    )

  const error = {
    noResultsHeader,
    noResults,
    serverError
  }

  return {
    cache: false,
    searchOnFocus: false,
    showNoResults: true,
    maxResults: 5,
    minCharacters: 1,
    searchDelay: 500,
    apiSettings,
    error,
    fields,
    onSelect
  }
}
