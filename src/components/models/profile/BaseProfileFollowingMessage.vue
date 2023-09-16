<template>
  <Component
    :is="component"
    v-if="isRender"
    class="base-following-message-container"
  >
    <div
      v-if="isFollowing"
      class="base-following-message"
    >
      <BaseIcon
        class="green"
        icon="profileFollowing"
        is-with-rtl
      />

      <div
        v-text="followingText"
      />
    </div>

    <div
      v-if="isFollowed"
      class="base-following-message"
    >
      <BaseIcon
        class="green"
        icon="profileFollowed"
        is-with-rtl
      />

      <div
        v-text="followedText"
      />
    </div>
  </Component>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

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

<style lang="sass" scoped>
.base-following-message-container
  @extend .d-flex, .flex-column, .align-items-center

.base-following-message
  @extend .d-flex, .align-items-center
</style>
