import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  props: {
    isInvertable: {
      type: Boolean,
      default: true
    },
    isTransparent: {
      type: Boolean,
      default: true
    },
    isBasic: Boolean
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    buttonColorClass () {
      if (this.isDarkMode) {
        if (this.isInvertable || this.isBasic) {
          if (this.isTransparent) {
            return 'inverted'
          } else {
            return 'inverted background-black'
          }
        } else {
          return null
        }
      } else {
        if (this.isTransparent) {
          return null
        } else {
          return 'background-white'
        }
      }
    }
  }
}
