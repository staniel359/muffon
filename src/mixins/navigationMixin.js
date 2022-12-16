import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import {
  ipcRenderer
} from 'electron'

export default {
  data () {
    return {
      isRefreshNavigation: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'tabId'
      ]
    ),
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    )
  },
  watch: {
    profileLanguage:
      'handleProfileLanguageChange'
  },
  activated () {
    if (this.isRefreshNavigation) {
      this.setNavigation()
    }
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setNavigationSections'
      ]
    ),
    handleNavigationDataChange () {
      this.setNavigation()

      this.isRefreshNavigation = true
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
