<template>
  <div
    id="the-online-observer"
  />
</template>

<script>
import socketMixin from '@/mixins/socketMixin'

export default {
  name: 'TheOnlineObserver',
  mixins: [
    socketMixin
  ],
  data () {
    return {
      channel: 'OnlineChannel'
    }
  }
}
</script>

<style lang="sass" scoped></style>
