import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseArtistPopup from '@/components/popups/artist/BaseArtistPopup.vue'
import {
  set as setPopup,
  reposition as repositionPopup,
  hide as hidePopup,
  destroy as destroyPopup
} from '@/helpers/actions/plugins/semantic/popup'
import {
  artist as artistPopupOptions
} from '@/helpers/formatters/plugins/semantic/options/popup'

export default {
  components: {
    BaseArtistPopup
  },
  provide () {
    return {
      setIsOptionsActive:
        this.setIsOptionsActive
    }
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
      isVisible: false,
      isOptionsActive: false
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
          onHide: this.handleHide,
          onHidden: this.handleHidden
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
    isSetPopup:
      'handleIsSetPopupChange',
    isLinkActive:
      'handleIsLinkActiveChange',
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
      this.initialize()
    },
    handleShow () {
      this.isCalled = true
      this.isVisible = true
    },
    handleHide () {
      return !this.isOptionsActive
    },
    handleHidden () {
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
      if (this.isSetPopup) {
        setPopup(
          this.element,
          this.popupOptions
        )
      }
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
    },
    setIsOptionsActive (
      value
    ) {
      this.isOptionsActive = value
    }
  }
}
