<template>
  <div
    id="the-session-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import {
  ipcRenderer
} from 'electron'
import updateOnline from '@/helpers/actions/api/online/update'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'TheSessionObserver',
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isLoggedIn () {
      return !!this.profileId
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
      'logout',
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

      this.resetTitle()
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
    },
    resetTitle () {
      ipcRenderer.send(
        'set-title',
        null
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
