<template>
  <BaseProfileFollowingMessage
    class="following-message"
    :other-profile-data="otherProfileData"
  />

  <BaseProfileFollowButton
    class="fluid"
    :profile-data="profileData"
  />
</template>

<script>
import BaseProfileFollowingMessage
  from '*/components/models/profile/BaseProfileFollowingMessage.vue'
import BaseProfileFollowButton
  from '*/components/models/profile/BaseProfileFollowButton.vue'

export default {
  name: 'FollowSection',
  components: {
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
