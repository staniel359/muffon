<template>
  <div
    id="the-quit-observer"
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
  name: 'TheQuitObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCloseTabsOnQuit',
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
      'quit',
      this.handleQuit
    )
  },
  methods: {
    async handleQuit () {
      if (!this.isRememberProfile) {
        await this.clearProfileData()
      }

      if (this.isCloseTabsOnQuit) {
        await this.clearTabs()
      }

      if (this.isShowDonateModalLater) {
        await this.resetDonateModalData()
      }

      this.quit()
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
    quit () {
      ipcRenderer.send(
        'quit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
