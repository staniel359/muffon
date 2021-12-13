<template>
  <div
    v-if="isFollowed"
    class="main-following-message"
  >
    <i class="green check icon"></i>
    <div>
      {{ followingText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFollowingMessage',
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isFollowed () {
      return this.profileData.other_profile.followed_by_profile
    },
    followingText () {
      return this.$t(
        'shared.profile.following'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
