// Dimmer

export function setDimmer (el, options) {
  $(el).dimmer(options)
}

export function toggleDimmer (el, bool) {
  $(el).dimmer(bool ? 'show' : 'hide')
}

// Modal

export function setModal (el, options) {
  $(el).modal(options)
}

export function showModal (el) {
  $(el).modal('show')
}

export function hideModal (el) {
  $(el).modal('hide')
}

export function toggleModal (el) {
  $(el).modal('toggle')
}

// Search

export function setSearch (el, options) {
  $(el).search(options)
}

export function setSearchSource (el, source) {
  $(el).search('setting', 'source', source)
}

// Transition

export function setTransition (el, options) {
  $(el).transition(options).transition('hide')
}

export function toggleTransition (el, options) {
  $(el).transition(options)
}

// Visibility

export function setVisibility (el, options) {
  $(el).visibility(options)
}

// Sidebar

export function setSidebar (el, options) {
  $(el).sidebar(options)
}

export function showSidebar (el) {
  $(el).sidebar('show')
}

export function hideSidebar (el) {
  $(el).sidebar('hide')
}

export function toggleSidebar (el) {
  $(el).sidebar('toggle')
}

// Seeker

export function setSeeker (el, options) {
  $(el).slider(options)
}

export function setSeekerValue (el, value) {
  $(el).slider('set value', value)
}

// Popup

export function setPopup (el, options) {
  $(el).popup(options)
}

// Dropdown

export function setDropdown (el, options) {
  $(el).dropdown(options)
}

export function selectDropdownValue (el, value) {
  $(el).dropdown('set selected', value)
}

// Checkbox

export function setCheckbox (el, options) {
  $(el).checkbox(options)
}

export function checkCheckbox (el) {
  $(el).checkbox('check')
}

// Utils

export function numberToColumnWidth (number = 1) {
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

  return data[number]
}
