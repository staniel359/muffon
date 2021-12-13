<template>
  <BaseDivider />

  <BaseFollowingMessage
    class="following-message"
    :profileData="profileData"
  />

  <BaseFollowButton
    class="fluid"
    :profileData="profileData"
  />
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import BaseFollowingMessage from '@/models/profile/BaseFollowingMessage.vue'
import BaseFollowButton from '@/models/profile/BaseFollowButton.vue'

export default {
  name: 'FollowSection',
  components: {
    BaseDivider,
    BaseFollowingMessage,
    BaseFollowButton
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped>
.following-message
  @extend .justify-content-center
  margin-bottom: 1em
</style>
