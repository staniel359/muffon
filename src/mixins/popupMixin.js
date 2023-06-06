import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  set as setPopup
} from '@/helpers/actions/plugins/semantic/popup'

export default {
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    popup () {
      return this.$refs.popup?.$el
    }
  },
  watch: {
    isDarkMode:
      'handleIsDarkModeChange'
  },
  mounted () {
    this.initialize()
  },
  activated () {
    this.initialize()
  },
  methods: {
    handleIsDarkModeChange () {
      this.initialize()
    },
    initialize () {
      if (this.popup) {
        setPopup(
          this.element,
          this.popupOptions
        )
      }
    }
  }
}
