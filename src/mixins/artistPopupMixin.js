import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseArtistPopup from '@/components/popups/BaseArtistPopup.vue'
import {
  setPopup,
  repositionPopup,
  hidePopup,
  destroyPopup
} from '@/helpers/actions/plugins/semantic'
import {
  artistPopupOptions
} from '@/helpers/formatters/semantic'

export default {
  components: {
    BaseArtistPopup
  },
  props: {
    isWithPopup: {
      type: Boolean,
      default: true
    },
    isLinkActive: Boolean
  },
  data () {
    return {
      isCalled: false,
      isVisible: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'isWithArtistPopup'
      ]
    ),
    isSetPopup () {
      return (
        this.isWithArtistPopup &&
          this.isWithPopup
      )
    },
    element () {
      return this.$refs.link.$el
    },
    popupOptions () {
      return artistPopupOptions(
        {
          html: this.popup,
          onShow: this.handleShow,
          onHide: this.handleHide
        }
      )
    },
    popup () {
      return this.$refs
        .popup
        .$refs
        .segment
        .$refs
        .segment
    }
  },
  watch: {
    isSetPopup: 'handleIsSetPopupChange',
    isLinkActive: 'handleIsLinkActiveChange',
    isDarkMode: 'handleIsDarkModeChange'
  },
  mounted () {
    if (this.isSetPopup) {
      this.initialize()
    }
  },
  activated () {
    if (this.isSetPopup) {
      this.initialize()
    }
  },
  methods: {
    handleIsSetPopupChange (
      value
    ) {
      this.toggleSetup(
        value
      )
    },
    handleIsLinkActiveChange (
      value
    ) {
      this.toggleSetup(
        value
      )
    },
    handleIsDarkModeChange () {
      if (this.isSetPopup) {
        this.initialize()
      }
    },
    handleShow () {
      this.isCalled = true
      this.isVisible = true
    },
    handleHide () {
      this.isVisible = false
    },
    async handleArtistDataChange () {
      await this.$nextTick()

      this.reposition()
    },
    handlePopupLinkClick () {
      this.$emit(
        'linkClick'
      )

      this.hide()
    },
    toggleSetup (
      value
    ) {
      if (value) {
        this.initialize()
      } else {
        this.destroy()
      }
    },
    initialize () {
      setPopup(
        this.element,
        this.popupOptions
      )
    },
    reposition () {
      repositionPopup(
        this.element
      )
    },
    hide () {
      hidePopup(
        this.element
      )
    },
    destroy () {
      destroyPopup(
        this.element
      )
    }
  }
}
