import {
  mapState,
  mapActions
} from 'vuex'
import {
  updateTab
} from '*/helpers/actions'

export default {
  computed: {
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

      updateTab(
        this.tabData
      )
    }
  }
}
