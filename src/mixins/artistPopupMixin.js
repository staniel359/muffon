import {
  mapState
} from 'vuex'
import BaseArtistPopup from '@/components/popups/BaseArtistPopup.vue'
import {
  setPopup,
  repositionPopup,
  hidePopup,
  destroyPopup
} from '@/helpers/actions/plugins/semantic'
import {
  artistPopupOptions
} from '@/helpers/data/plugins/semantic'

export default {
  components: {
    BaseArtistPopup
  },
  data () {
    return {
      isCalled: false
    }
  },
  props: {
    isWithPopup: {
      type: Boolean,
      default: true
    },
    isLinkActive: Boolean
  },
  computed: {
    ...mapState(
      'layout',
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
          onShow: this.handleShow
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
    isSetPopup: {
      immediate: true,
      handler: 'handleIsSetPopupChange'
    },
    isLinkActive: 'handleIsLinkActiveChange',
    isDarkMode: 'handleIsDarkModeChange'
  },
  methods: {
    async handleIsSetPopupChange (
      value
    ) {
      await this.$nextTick()

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
