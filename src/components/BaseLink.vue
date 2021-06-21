<template>
  <RouterLink
    class="ui main-link"
    :to="link"
    @click.ctrl.exact.prevent="handleCtrlClick"
  >
    {{ text }}
  </RouterLink>
</template>

<script>
import { ipcRenderer } from 'electron'
import { generateKey } from '#/utils'

export default {
  name: 'BaseLink',
  props: {
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
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
