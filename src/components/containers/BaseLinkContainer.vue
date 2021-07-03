<template>
  <RouterLink
    class="main-link-container"
    :to="link"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
  >
    <slot></slot>
  </RouterLink>
</template>

<script>
import { ipcRenderer } from 'electron'
import { generateKey } from '#/utils'

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
  methods: {
    handleClick () {
      this.$emit('click')
    },
    handleCtrlClick () {
      const tab = this.getTabData()

      ipcRenderer.send(
        'add-tab',
        tab
      )

      ipcRenderer.send(
        'set-top-tab',
        tab.uuid
      )
    },
    getTabData () {
      return {
        uuid: generateKey(),
        path: this.link.path
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
