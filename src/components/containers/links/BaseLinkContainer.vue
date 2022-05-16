<template>
  <RouterLink
    class="main-link-container"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
    @auxclick.exact.stop="handleMiddleClick"
  >
    <slot />
  </RouterLink>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BaseLinkContainer',
  props: {
    link: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: [
    'click',
    'activeChange'
  ],
  computed: {
    isLinkPresent () {
      return Object.keys(
        this.link
      ).length
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
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    },
    handleCtrlClick () {
      this.openNewTab()
    },
    handleMiddleClick () {
      this.openNewTab()
    },
    openNewTab () {
      if (this.isLinkPresent) {
        const tab = this.getTabData()

        ipcRenderer.send(
          'add-tab',
          tab
        )

        ipcRenderer.send(
          'set-top-tab',
          tab.uuid
        )
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
