<template>
  <div
    id="the-exit-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '#/plugins/electronStore'
import {
  mapState,
  mapGetters
} from 'vuex'
import updateOnline from '@/helpers/actions/api/online/update'

export default {
  name: 'TheExitObserver',
  computed: {
    ...mapState(
      'layout',
      [
        'isCloseTabsOnExit'
      ]
    ),
    ...mapState(
      'profile',
      {
        isRememberProfile: 'isRemember'
      }
    ),
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
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
        this.clearProfileData()
      }

      if (this.isCloseTabsOnExit) {
        this.clearTabs()
      }

      if (this.profileId) {
        await this.setOffline()
      }

      this.exit()
    },
    setOffline () {
      return updateOnline(
        {
          isOnline: false
        }
      )
    },
    clearProfileData () {
      electronStore.set(
        {
          'profile.info': null,
          'profile.token': null
        }
      )
    },
    clearTabs () {
      electronStore.set(
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
