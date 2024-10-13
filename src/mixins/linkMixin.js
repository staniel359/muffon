import newTabMixin from '@/mixins/newTabMixin'

export default {
  mixins: [
    newTabMixin
  ],
  props: {
    link: Object
  },
  emits: [
    'click',
    'activeChange'
  ],
  computed: {
    component () {
      if (this.link) {
        return 'RouterLink'
      } else {
        return 'a'
      }
    },
    path () {
      return this.link?.path
    }
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    },
    handleClick () {
      this.$emit(
        'click'
      )
    },
    handleCtrlClick () {
      this.openPathInNewTab()
    },
    handleAuxClick (
      event
    ) {
      const isMiddleClick = (
        event.which === 2
      )

      if (isMiddleClick) {
        this.openPathInNewTab()
      }
    },
    openPathInNewTab () {
      if (!this.path) { return }

      this.openNewTab(
        {
          path: this.path
        }
      )
    }
  }
}
