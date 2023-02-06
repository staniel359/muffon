<template>
  <div
    id="the-exit-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import {
  ipcRenderer
} from 'electron'
import electronStore from '#/plugins/electronStore'

export default {
  name: 'TheExitObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCloseTabsOnExit'
      ]
    ),
    ...mapState(
      profileStore,
      {
        isRememberProfile: 'isRemember'
      }
    )
  },
  mounted () {
    ipcRenderer.on(
      'exit',
      this.handleExit
    )
  },
  methods: {
    async handleExit () {
      if (!this.isRememberProfile) {
        await this.clearProfileData()
      }

      if (this.isCloseTabsOnExit) {
        await this.clearTabs()
      }

      this.exit()
    },
    clearProfileData () {
      return electronStore.set(
        {
          'profile.info': null,
          'profile.token': null
        }
      )
    },
    clearTabs () {
      return electronStore.set(
        {
          'layout.tabs': []
        }
      )
    },
    exit () {
      ipcRenderer.send(
        'exit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
