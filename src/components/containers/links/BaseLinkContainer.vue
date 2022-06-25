<template>
  <Component
    :is="component"
    class="ui main-link-container"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
    @auxclick.exact.stop="handleMiddleClick"
  >
    <slot />
  </Component>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'vuex'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BaseLinkContainer',
  props: {
    link: Object
  },
  emits: [
    'click',
    'activeChange'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isSwitchToNewTab'
      ]
    ),
    component () {
      if (this.link) {
        return 'RouterLink'
      } else {
        return 'a'
      }
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
      this.openNewTab()
    },
    handleMiddleClick () {
      this.openNewTab()
    },
    openNewTab () {
      if (this.link) {
        const tab = this.getTabData()

        ipcRenderer.send(
          'add-tab',
          tab
        )

        if (this.isSwitchToNewTab) {
          ipcRenderer.send(
            'set-active-tab',
            tab.uuid
          )
        }
      }
    },
    getTabData () {
      return {
        uuid: generateKey(),
        path: this.link.path,
        isLoading: true
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
