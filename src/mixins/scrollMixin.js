import {
  hideAll as hideAllPopups
} from '@/helpers/actions/plugins/semantic/popup'

export default {
  data () {
    return {
      isScrolling: false
    }
  },
  watch: {
    scrollable: {
      immediate: true,
      handler: 'handleScrollableChange'
    },
    isScrolling:
      'handleIsScrollingChange'
  },
  methods: {
    handleScrollableChange (
      value
    ) {
      if (value) {
        this.addScrollEvents()
      }
    },
    handleScroll () {
      this.isScrolling = true
    },
    handleScrollEnd () {
      this.isScrolling = false
    },
    handleIsScrollingChange (
      value
    ) {
      if (value) {
        hideAllPopups()
      }
    },
    addScrollEvents () {
      this.scrollable
        .addEventListener(
          'scroll',
          this.handleScroll
        )

      this.scrollable
        .addEventListener(
          'scrollend',
          this.handleScrollEnd
        )
    }
  }
}
