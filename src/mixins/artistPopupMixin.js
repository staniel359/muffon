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
    isLinkActive: 'handleIsLinkActiveChange'
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
    handleShow () {
      this.isCalled = true
    },
    async handleArtistDataChange () {
      await this.$nextTick()

      repositionPopup(
        this.element
      )
    },
    handlePopupLinkClick () {
      this.$emit(
        'linkClick'
      )

      hidePopup(
        this.element
      )
    },
    toggleSetup (
      value
    ) {
      if (value) {
        setPopup(
          this.element,
          this.popupOptions
        )
      } else {
        destroyPopup(
          this.element
        )
      }
    }
  }
}
