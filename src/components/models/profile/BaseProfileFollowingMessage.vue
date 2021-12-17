<template>
  <div
    v-if="isFollowing || isFollowed"
    class="main-following-message-container"
  >
    <div
      v-if="isFollowing"
      class="main-following-message"
    >
      <i class="green left arrow icon"></i>
      <div>
        {{ followingText }}
      </div>
    </div>

    <div
      v-if="isFollowed"
      class="main-following-message"
    >
      <i class="green right arrow icon"></i>
      <div>
        {{ followedText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseProfileFollowingMessage',
  props: {
    otherProfileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isFollowing () {
      return this.otherProfileData.follower_of_profile
    },
    followingText () {
      return this.$t(
        'relationships.following'
      )
    },
    isFollowed () {
      return this.otherProfileData.followed_by_profile
    },
    followedText () {
      return this.$t(
        'relationships.followed'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
