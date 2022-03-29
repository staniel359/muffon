<template>
  <BaseDivider />

  <BaseProfileFollowingMessage
    class="following-message"
    :otherProfileData="otherProfileData"
  />

  <BaseProfileFollowButton
    class="fluid"
    :profileData="profileData"
  />
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseProfileFollowingMessage
  from '*/components/models/profile/BaseProfileFollowingMessage.vue'
import BaseProfileFollowButton
  from '*/components/models/profile/BaseProfileFollowButton.vue'

export default {
  name: 'FollowSection',
  components: {
    BaseDivider,
    BaseProfileFollowingMessage,
    BaseProfileFollowButton
  },
  props: {
    profileData: Object
  },
  computed: {
    otherProfileData () {
      return this.profileData.other_profile
    }
  }
}
</script>

<style lang="sass" scoped>
.following-message
  margin-bottom: 1em
</style>
