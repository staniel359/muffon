import {
  ipcRenderer
} from 'electron'
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'

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
    ),
    isAddRouteToHistory () {
      return !!this.$route.name
    },
    routeString () {
      return JSON.stringify(
        this.routeFormatted
      )
    },
    routeFormatted () {
      return {
        name: this.$route.name,
        data: this.navigationData
      }
    }
  },
  watch: {
    profileLanguage:
      'handleProfileLanguageChange'
  },
  activated () {
    if (this.isRefreshNavigation) {
      this.setNavigation()

      this.addRouteToHistory()
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

      this.addRouteToHistory()
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
    },
    addRouteToHistory () {
      if (this.isAddRouteToHistory) {
        const data = {
          route: this.routeString
        }

        ipcRenderer.send(
          'navigate',
          data
        )
      }
    }
  }
}
