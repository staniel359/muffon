<template>
  <div
    id="the-session-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'vuex'
import updateOnline from '*/helpers/actions/api/online/update'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'TheSessionObserver',
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo?.id
    },
    isLoggedIn () {
      return !!this.profileInfo
    }
  },
  watch: {
    isLoggedIn: {
      immediate: true,
      handler: 'handleIsLoggedInChange'
    }
  },
  mounted () {
    ipcRenderer.on(
      'handle-logout',
      this.handleLogout
    )
  },
  methods: {
    handleIsLoggedInChange (
      value
    ) {
      this.setOnline(
        value
      )
    },
    handleLogout () {
      this.setOnline(
        false
      )

      this.setLogoutData()
    },
    setOnline (
      value
    ) {
      if (this.profileId) {
        return updateOnline(
          {
            isOnline: value
          }
        )
      }
    },
    setLogoutData () {
      updateGlobalStore(
        {
          'profile.info': null,
          'profile.token': null,
          'profile.isRemember': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
