<template>
  <Component
    :is="component"
    v-if="isRender"
    class="main-following-message-container"
  >
    <div
      v-if="isFollowing"
      class="main-following-message"
    >
      <BaseIcon
        icon="green left arrow"
      />

      <div
        v-text="followingText"
      />
    </div>

    <div
      v-if="isFollowed"
      class="main-following-message"
    >
      <BaseIcon
        icon="green right arrow"
      />

      <div
        v-text="followedText"
      />
    </div>
  </Component>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseProfileFollowingMessage',
  components: {
    BaseIcon
  },
  props: {
    otherProfileData: {
      type: Object,
      required: true
    },
    isSmall: Boolean
  },
  computed: {
    component () {
      if (this.isSmall) {
        return 'small'
      } else {
        return 'div'
      }
    },
    isRender () {
      return (
        this.isFollowing ||
          this.isFollowed
      )
    },
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
