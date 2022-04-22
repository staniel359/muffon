<template>
  <RouterLink
    class="main-link-container"
    :to="link"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
    @auxclick="handleMiddleClick"
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
    'click'
  ],
  computed: {
    isLinkPresent () {
      return Object.keys(
        this.link
      ).length
    }
  },
  methods: {
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
