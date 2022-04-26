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
      'profile',
      {
        profileInfo: 'info',
        profileToken: 'token',
        isRememberProfile: 'isRemember'
      }
    ),
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    isProfileData () {
      return (
        this.profileInfo ||
          this.profileToken
      )
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
      if (this.profileId) {
        await this.setOffline()
      }

      if (this.isRememberProfile) {
        this.exit()
      } else {
        if (this.isProfileData) {
          this.resetProfileDataThenExit()
        } else {
          this.exit()
        }
      }
    },
    handleElectronStoreChange (
      value
    ) {
      const isNoInfo =
        !value['profile.info']

      const isNoToken =
        !value['profile.token']

      const isReset = (
        isNoInfo &&
          isNoToken
      )

      if (isReset) {
        this.exit()
      }
    },
    setOffline () {
      updateOnline(
        {
          isOnline: false
        }
      )
    },
    resetProfileDataThenExit () {
      electronStore.onDidAnyChange(
        this.handleElectronStoreChange
      )

      electronStore.set(
        {
          'profile.info': null,
          'profile.token': null
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
