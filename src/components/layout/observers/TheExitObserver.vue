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

export default {
  name: 'TheExitObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCloseTabsOnExit',
        'isShowDonateModalLater'
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

      if (this.isShowDonateModalLater) {
        await this.resetDonateModalData()
      }

      this.exit()
    },
    clearProfileData () {
      return this.setElectronStoreData(
        {
          'profile.info': null,
          'profile.token': null
        }
      )
    },
    setElectronStoreData (
      value
    ) {
      const dataFormatted =
        JSON.stringify(
          value
        )

      return ipcRenderer.invoke(
        'set-electron-store-data',
        dataFormatted
      )
    },
    clearTabs () {
      return this.setElectronStoreData(
        {
          'layout.tabs': []
        }
      )
    },
    resetDonateModalData () {
      return this.setElectronStoreData(
        {
          'layout.isShowDonateModal': true
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
