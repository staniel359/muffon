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
    isDarkMode:
      'handleIsDarkModeChange',
    isCalled: 'handleIsCalledChange'
  },
  mounted () {
    if (this.isLazy) { return }

    this.initialize()
  },
  activated () {
    if (this.isLazy) { return }

    this.initialize()
  },
  methods: {
    handleIsDarkModeChange () {
      this.initialize()
    },
    handleIsCalledChange (
      value
    ) {
      if (!value) { return }

      this.initializeAndShow()
    },
    initialize () {
      if (!this.popup) { return }

      setPopup(
        this.element,
        this.popupOptions
      )
    },
    async initializeAndShow () {
      await this.$nextTick()

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
