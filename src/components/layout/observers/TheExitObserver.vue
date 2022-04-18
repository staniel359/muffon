<template>
  <div
    id="the-exit-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'vuex'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import updateOnline from '*/helpers/actions/api/online/update'

export default {
  name: 'TheExitObserver',
  computed: {
    ...mapState(
      'profile',
      {
        isRememberProfile: 'isRemember',
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo?.id
    }
  },
  mounted () {
    ipcRenderer.on(
      'handle-exit',
      this.handleExit
    )
  },
  methods: {
    async handleExit () {
      await this.setOffline()

      await this.setExitData()

      this.exit()
    },
    setOffline () {
      if (this.profileId) {
        return updateOnline(
          {
            isOnline: false
          }
        )
      }
    },
    setExitData () {
      if (!this.isRememberProfile) {
        return updateGlobalStore(
          {
            'profile.info': null
          }
        )
      }
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
