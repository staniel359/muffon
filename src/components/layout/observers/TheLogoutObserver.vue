<template>
  <div
    id="the-logout-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'TheLogoutObserver',
  mounted () {
    ipcRenderer.on(
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
      ipcRenderer.send(
        'set-title',
        null
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
