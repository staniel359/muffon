<template>
  <div id="the-keys-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import Mousetrap from 'mousetrap'
import { ipcRenderer } from 'electron'
import local from '#/plugins/local'

export default {
  name: 'TheKeysObserver',
  computed: {
    ...mapState('layout', [
      'searchModal'
    ])
  },
  mounted () {
    Mousetrap.bind(
      'mod+f',
      this.handleShowSearchCall
    )

    Mousetrap.bind(
      'mod+w',
      this.handleRemoveTabCall
    )
  },
  methods: {
    handleShowSearchCall () {
      this.searchModal.show()
    },
    handleRemoveTabCall () {
      ipcRenderer.send(
        'remove-tab',
        this.getLocalTabId()
      )
    },
    getLocalTabId () {
      return local.get(
        'layout.activeTabId'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
