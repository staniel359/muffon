<template>
  <div
    id="the-logout-observer"
  />
</template>

<script>
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  reset as resetProfileInfo
} from '@/helpers/actions/profile/info'

export default {
  name: 'TheLogoutObserver',
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'logout',
        this.handleLogout
      )
  },
  methods: {
    handleLogout () {
      this.setLogoutData()

      this.resetTitle()
    },
    setLogoutData () {
      resetProfileInfo()

      updateGlobalStore(
        {
          'profile.token': null,
          'profile.isRemember': false
        }
      )
    },
    resetTitle () {
      window
        .mainProcess
        .sendCommand(
          'set-title',
          null
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
