import {
  mapState
} from 'vuex'
import {
  setPopup
} from '@/helpers/actions/plugins/semantic'

export default {
  computed: {
    ...mapState(
      'layout',
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
