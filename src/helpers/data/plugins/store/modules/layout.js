export default {
  namespaced: true,
  state: {
    loaderDimmer: null,
    playerPanel: null,
    queuePanel: null,
    searchModal: null,
    tabId: null,
    visibleContext: null,
    isDarkMode: false,
    isSwitchToNewTab: true,
    isQueuePanelVisible: false,
    isWithInfiniteScroll: false,
    navigationSections: [],
    backgroundImages: [],
    backgroundImageId: 0,
    backgroundImagePath: null,
    transparency: 0
  },
  mutations: {
    SET_LOADER_DIMMER (
      state,
      value
    ) {
      state.loaderDimmer = value
    },
    SET_PLAYER_PANEL (
      state,
      value
    ) {
      state.playerPanel = value
    },
    SET_QUEUE_PANEL (
      state,
      value
    ) {
      state.queuePanel = value
    },
    SET_NAVIGATION_SECTIONS (
      state,
      value
    ) {
      state.navigationSections = value
    },
    SET_IS_QUEUE_PANEL_VISIBLE (
      state,
      value
    ) {
      state.isQueuePanelVisible = value
    },
    SET_VISIBLE_CONTEXT (
      state,
      value
    ) {
      state.visibleContext = value
    },
    SET_IS_DARK_MODE (
      state,
      value
    ) {
      state.isDarkMode = value
    },
    SET_TAB_ID (
      state,
      value
    ) {
      state.tabId = value
    },
    SET_SEARCH_MODAL (
      state,
      value
    ) {
      state.searchModal = value
    },
    SET_IS_SWITCH_TO_NEW_TAB (
      state,
      value
    ) {
      state.isSwitchToNewTab = value
    },
    SET_IS_WITH_INFINITE_SCROLL (
      state,
      value
    ) {
      state.isWithInfiniteScroll = value
    },
    SET_BACKGROUND_IMAGES (
      state,
      value
    ) {
      state.backgroundImages = value
    },
    SET_BACKGROUND_IMAGE_ID (
      state,
      value
    ) {
      state.backgroundImageId = value
    },
    SET_BACKGROUND_IMAGE_PATH (
      state,
      value
    ) {
      state.backgroundImagePath = value
    },
    SET_TRANSPARENCY (
      state,
      value
    ) {
      state.transparency = value
    }
  },
  actions: {
    setLoaderDimmer (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_LOADER_DIMMER',
        value
      )
    },
    setPlayerPanel (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_PLAYER_PANEL',
        value
      )
    },
    setQueuePanel (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_QUEUE_PANEL',
        value
      )
    },
    setNavigationSections (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_NAVIGATION_SECTIONS',
        value
      )
    },
    setIsQueuePanelVisible (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_QUEUE_PANEL_VISIBLE',
        value
      )
    },
    setVisibleContext (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_VISIBLE_CONTEXT',
        value
      )
    },
    setIsDarkMode (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_DARK_MODE',
        value
      )
    },
    setTabId (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_TAB_ID',
        value
      )
    },
    setSearchModal (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_SEARCH_MODAL',
        value
      )
    },
    setIsSwitchToNewTab (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_SWITCH_TO_NEW_TAB',
        value
      )
    },
    setIsWithInfiniteScroll (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_INFINITE_SCROLL',
        value
      )
    },
    setBackgroundImages (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_BACKGROUND_IMAGES',
        value
      )
    },
    setBackgroundImageId (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_BACKGROUND_IMAGE_ID',
        value
      )
    },
    setBackgroundImagePath (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_BACKGROUND_IMAGE_PATH',
        value
      )
    },
    setTransparency (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_TRANSPARENCY',
        value
      )
    }
  }
}
