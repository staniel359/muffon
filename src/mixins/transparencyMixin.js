import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  props: {
    isChangeTransparency: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'transparency'
      ]
    ),
    transparentClass () {
      if (this.isChangeTransparency) {
        return [
          'transparent',
          this.color,
          this.transparency
        ].join(
          '-'
        )
      } else {
        return null
      }
    },
    color () {
      if (this.isDarkMode) {
        return 'dark'
      } else {
        return 'light'
      }
    }
  }
}
