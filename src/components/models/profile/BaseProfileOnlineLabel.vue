<template>
  <div
    :class="[
      'ui tiny empty circular label',
      'base-profile-online-label',
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
.base-profile-online-label
  @extend .no-margin
  &:not(.inverted)
    @extend .border-white
  &.inverted
    @extend .border-black
</style>
