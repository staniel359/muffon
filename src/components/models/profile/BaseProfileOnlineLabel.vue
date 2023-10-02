<template>
  <div
    class="ui tiny empty circular label base-profile-online-label main-label border-white absolute no-right"
    :class="[
      onlineLabelColor,
      {
        inverted: isDarkMode
      }
    ]"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseProfileOnlineLabel',
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    onlineLabelColor () {
      if (this.isOnline) {
        return 'green'
      } else {
        return null
      }
    },
    isOnline () {
      return this.profileData.online
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.base-profile-online-label
  z-index: 1
  &.inverted
    @extend .border-black
</style>
