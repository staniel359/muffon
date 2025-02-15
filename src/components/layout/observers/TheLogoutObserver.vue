<template>
  <div
    id="the-logout-observer"
  />
</template>

<script>
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

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
      updateGlobalStore(
        {
          'profile.info': null,
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
