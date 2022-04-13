<template>
  <div
    id="the-online-observer"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import updateOnline from '*/helpers/actions/api/online/update'

export default {
  name: 'TheOnlineObserver',
  computed: {
    ...mapState(
      'profile',
      {
        isProfileLoggedIn: 'isLoggedIn',
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo?.id
    }
  },
  watch: {
    isProfileLoggedIn: {
      immediate: true,
      handler: 'handleIsProfileLoggedInChange'
    }
  },
  mounted () {
    ipcRenderer.on(
      'handle-exit',
      this.handleExit
    )
  },
  methods: {
    handleIsProfileLoggedInChange (
      value
    ) {
      if (this.profileId) {
        const online = value ? 1 : 0

        this.setOnline(
          online
        )
      }
    },
    handleExit () {
      this.setOnline(
        0
      ).finally(
        this.handleOnlineFinish
      )
    },
    handleOnlineFinish () {
      ipcRenderer.send(
        'exit'
      )
    },
    setOnline (
      value
    ) {
      return updateOnline(
        {
          isOnline: value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
