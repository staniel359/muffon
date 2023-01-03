<template>
  <div
    id="the-account-delete-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'TheAccountDeleteObserver',
  mixins: [
    notificationMixin
  ],
  computed: {
    notificationSuccessMessage () {
      return this.$t(
        'notifications.deleted.account'
      )
    }
  },
  mounted () {
    ipcRenderer.on(
      'account-delete',
      this.handleAccountDelete
    )
  },
  methods: {
    handleAccountDelete () {
      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
