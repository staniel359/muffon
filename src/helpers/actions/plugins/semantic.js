import store from '*/plugins/store'

// Dimmer

export const setDimmer = (el, options) => {
  $(el).dimmer(options)
}

export const toggleDimmer = (el, bool) => {
  const value = bool ? 'show' : 'hide'

  $(el).dimmer(value)
}

// Modal

export const setModal = (el, options) => {
  $(el).modal(options)
}

export const showModal = el => {
  $(el).modal('show')
}

export const hideModal = el => {
  $(el).modal('hide')
}

// Search

export const setSearch = (el, options) => {
  $(el).search(options)
}

export const setSearchSource = (el, source) => {
  $(el).search(
    'setting',
    'source',
    source
  )
}

// Transition

export const showTransition = el => {
  $(el).transition({
    animation: 'fade in',
    duration: 150
  })
}

export const hideTransition = el => {
  $(el).transition({
    animation: 'fade out',
    duration: 150
  })
}

// Visibility

export const setVisibility = (el, options) => {
  $(el).visibility(options)
}

// Sidebar

export const setSidebar = (el, options) => {
  $(el).sidebar(options)
}

export const showSidebar = el => {
  $(el).sidebar('show')
}

export const hideSidebar = el => {
  $(el).sidebar('hide')
}

export const toggleSidebar = el => {
  $(el).sidebar('toggle')
}

// Seeker

export const setSeeker = (el, options) => {
  $(el).slider(options)
}

export const setSeekerValue = (el, value) => {
  $(el).slider(
    'set value',
    value
  )
}

// Popup

export const setPopup = (el, options) => {
  $(el).popup(options)
}

// Dropdown

export const setDropdown = (el, options) => {
  $(el).dropdown(options)
}

export const setDropdownValue = (el, value) => {
  $(el).dropdown(
    'set selected',
    value
  )
}

export const resetDropdown = el => {
  $(el).dropdown('restore defaults')
}

// Checkbox

export const setCheckbox = (el, options) => {
  $(el).checkbox(options)
}

export const checkCheckbox = (el, bool) => {
  const value = bool ? 'check' : 'uncheck'

  $(el).checkbox(value)
}

// Embed

export const setEmbed = (el, options) => {
  $(el).embed(options)
}

// Form

export const setForm = (el, options) => {
  $(el).form(options)
}

export const addFormFieldError = (el, field, error) => {
  $(el).form(
    'add prompt',
    field,
    error
  )
}

// Calendar

export const setCalendar = (el, options) => {
  $(el).calendar(options)
}

export const setCalendarDate = (el, value) => {
  $(el).calendar(
    'set date',
    value,
    false,
    false
  )
}

// Accordion

export const setAccordion = (el, options) => {
  $(el).accordion(options)
}

// Progress

export const setProgress = (el, options) => {
  $(el).progress(options)
}

export const resetProgress = el => {
  $(el).progress('reset')
  $(el).progress('remove success')
  $(el).progress('remove error')
}

export const setProgressTotalCount = (el, value) => {
  $(el).progress('set total', value)
}

export const incrementProgress = el => {
  $(el).progress('increment')
}

export const setProgressValue = (el, value) => {
  $(el).progress('set progress', value)
}

// Toast

export const setToast = ({ message, icon }) => {
  const {
    visibleContext,
    isDarkMode
  } = store.state.layout

  const className = isDarkMode
    ? 'inverted'
    : ''

  $('body').toast({
    showIcon: icon,
    context: visibleContext,
    class: className,
    message
  })
}

// Utils

export const numberToColumnWidth = (value = 1) => {
  const data = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen'
  }

  return data[value]
}
