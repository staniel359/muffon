import store from '*/store'

export function mainModalOptions ({ onShow, onVisible } = {}) {
  return {
    autofocus: false,
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

export function mainHistoryInputOptions ({ source, onSelect }) {
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

export function mainTransitionOptions () {
  return {
    animation: 'fade',
    duration: 150
  }
}

export function mainSidebarOptions ({ onShow, onVisible, onHide } = {}) {
  return {
    closable: false,
    dimPage: false,
    onVisible,
    onShow,
    onHide
  }
}

export function mainSeekerOptions ({ onMove, onChange } = {}) {
  return {
    max: 100,
    step: 0.25,
    onMove,
    onChange
  }
}

export function mainVolumeSeekerOptions ({ start, onMove } = {}) {
  return {
    max: 1,
    step: 0.01,
    start,
    onMove
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

export function popupOptions () {
  return {
    duration: 0,
    position: 'top center',
    variation: 'basic inverted small'
  }
}

export function mainDropdownOptions () {
  const { dropdownContext } = store.state.layout

  return {
    on: 'hover',
    duration: 150,
    context: dropdownContext,
    delay: {
      show: 0,
      hide: 150
    }
  }
}

export function mainCheckboxOptions ({ onChecked, onUnchecked } = {}) {
  return {
    onChecked,
    onUnchecked
  }
}

export function mainEmbedOptions ({
  source = 'youtube',
  id,
  placeholder
} = {}
) {
  return {
    source,
    id,
    placeholder
  }
}
