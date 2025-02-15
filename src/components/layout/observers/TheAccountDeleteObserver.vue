<template>
  <div
    id="the-account-delete-observer"
  />
</template>

<script>
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
    window
      .mainProcess
      .addCommandHandler(
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
