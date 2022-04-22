import {
  ipcRenderer
} from 'electron'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  computed: {
    ...mapState(
      'layout',
      [
        'tabId'
      ]
    ),
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    )
  },
  watch: {
    profileLanguage: 'handleProfileLanguageChange',
    isLoading: 'handleIsLoadingChange',
    error: 'handleErrorChange'
  },
  methods: {
    ...mapActions(
      'layout',
      [
        'setNavigationSections'
      ]
    ),
    handleNavigationDataChange () {
      this.setNavigation()
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    handleIsLoadingChange () {
      this.updateTabLoading()
    },
    handleErrorChange () {
      this.updateTabError()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      this.updateTab()
    },
    updateTab () {
      ipcRenderer.send(
        'update-tab',
        {
          tabId: this.tabId,
          data: this.tabData
        }
      )
    },
    updateTabLoading () {
      ipcRenderer.send(
        'update-tab',
        {
          tabId: this.tabId,
          isLoading: this.isLoading
        }
      )
    },
    updateTabError () {
      ipcRenderer.send(
        'update-tab',
        {
          tabId: this.tabId,
          isError: !!this.error
        }
      )
    }
  }
}
