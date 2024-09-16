import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  set as setPopup,
  show as showPopup
} from '@/helpers/actions/plugins/semantic/popup'

export default {
  data () {
    return {
      isCalled: false
    }
  },
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
    isDarkMode: 'handleIsDarkModeChange',
    isCalled: 'handleIsCalledChange'
  },
  mounted () {
    if (!this.isLazy) {
      this.initialize()
    }
  },
  methods: {
    handleIsDarkModeChange () {
      this.initialize()
    },
    async handleIsCalledChange (
      value
    ) {
      if (value) {
        await this.$nextTick()

        this.initializeAndShow()
      }
    },
    initialize () {
      if (this.popup) {
        setPopup(
          this.element,
          this.popupOptions
        )
      }
    },
    initializeAndShow () {
      this.initialize()

      this.show()
    },
    show () {
      showPopup(
        this.element
      )
    }
  }
}
