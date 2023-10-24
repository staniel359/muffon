import {
  ipcRenderer
} from 'electron'
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import {
  isObjectChanged
} from '@/helpers/utils'

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
    routeDataFormatted () {
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
  mounted () {
    if (this.isPageLoaded) {
      this.setNavigation()

      this.isRefreshNavigation = true
    }
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
    handleNavigationDataChange (
      value,
      oldValue
    ) {
      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.setNavigation()

        this.isRefreshNavigation = true

        if (!oldValue) {
          this.addRouteToHistory()
        }
      }
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
        const routeData =
          JSON.stringify(
            this.routeDataFormatted
          )

        ipcRenderer.send(
          'navigate',
          routeData
        )
      }
    }
  }
}
