import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  setPopup
} from '@/helpers/actions/plugins/semantic'

export default {
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    popup () {
      return this.$refs.popup.$el
    }
  },
  watch: {
    isDarkMode: 'handleIsDarkModeChange'
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
      setPopup(
        this.element,
        this.popupOptions
      )
    }
  }
}
