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
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  reset as resetProfileInfo
} from '@/helpers/actions/profile/info'

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
    window
      .mainProcess
      .addCommandHandler(
        'quit-called',
        this.handleQuitCalled
      )
  },
  methods: {
    async handleQuitCalled () {
      if (!this.isRememberProfile) {
        await resetProfileInfo()
      }

      if (this.isCloseTabsOnQuit) {
        await this.clearTabs()
      }

      if (this.isShowDonateModalLater) {
        await this.resetDonateModalData()
      }

      this.quit()
    },
    clearTabs () {
      return updateGlobalStore(
        {
          'layout.tabs': []
        }
      )
    },
    resetDonateModalData () {
      return updateGlobalStore(
        {
          'layout.isShowDonateModal': true
        }
      )
    },
    quit () {
      window
        .mainProcess
        .sendCommand(
          'quit'
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
