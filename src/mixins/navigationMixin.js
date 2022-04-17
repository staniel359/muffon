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
    profileLanguage: 'handleProfileLanguageChange'
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
    }
  }
}
