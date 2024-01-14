<template>
  <Component
    :is="component"
    v-if="isRender"
    class="middle-aligned-column"
  >
    <div
      v-if="isRenderFollowing"
      class="middle-aligned"
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
      v-if="isRenderFollowed"
      class="middle-aligned"
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
import {
  isCurrentProfile
} from '@/helpers/utils'

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
    isSmall: Boolean,
    scope: String,
    pageProfileId: String
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
        this.isRenderFollowing ||
          this.isRenderFollowed
      )
    },
    isRenderFollowing () {
      return (
        this.isOtherProfileFollowing &&
          this.isFollowing
      )
    },
    isOtherProfileFollowing () {
      return !(
        this.isFollowingScope &&
          this.isSelf
      )
    },
    isFollowingScope () {
      return (
        this.scope === 'following'
      )
    },
    isSelf () {
      return isCurrentProfile(
        this.pageProfileId
      )
    },
    isFollowing () {
      return this.otherProfileData
        .follower_of_profile
    },
    isRenderFollowed () {
      return (
        this.isOtherProfileFollowers &&
          this.isFollowed
      )
    },
    isOtherProfileFollowers () {
      return !(
        this.isFollowersScope &&
          this.isSelf
      )
    },
    isFollowersScope () {
      return (
        this.scope === 'followers'
      )
    },
    isFollowed () {
      return this.otherProfileData
        .followed_by_profile
    },
    followingText () {
      return this.$t(
        'relationships.following'
      )
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
