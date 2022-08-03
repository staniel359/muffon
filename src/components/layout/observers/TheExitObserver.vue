<template>
  <div
    id="the-exit-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '*/plugins/electronStore'
import {
  mapState,
  mapGetters
} from 'vuex'
import updateOnline from '*/helpers/actions/api/online/update'

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
      if (this.profileId) {
        this.setOffline()

        await this.$nextTick()
      }

      if (!this.isRememberProfile) {
        this.clearProfileData()

        await this.$nextTick()
      }

      if (this.isCloseTabsOnExit) {
        this.clearTabs()

        await this.$nextTick()
      }

      this.exit()
    },
    setOffline () {
      updateOnline(
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
