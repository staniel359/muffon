import store from '*/store'

export const mainModalOptions = ({ onShow, onVisible } = {}) => {
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

export const mainVolumeSeekerOptions = ({ start, onMove } = {}) => {
  return {
    max: 1,
    step: 0.01,
    start,
    onMove
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

export const popupOptions = () => {
  return {
    duration: 0,
    position: 'top center',
    variation: 'basic inverted small',
    className: {
      popup: 'ui popup main-popup'
    }
  }
}

export const mainDropdownOptions = () => {
  const { visibleContext } = store.state.layout

  return {
    on: 'hover',
    duration: 150,
    context: visibleContext,
    delay: {
      show: 0,
      hide: 150
    }
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
    placeholder
  }
}
