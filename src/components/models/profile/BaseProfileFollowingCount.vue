<template>
  <div>
    <BaseLink
      class="following"
      :link="followersLink"
      :text="followersText"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />

    <BaseLink
      class="followers"
      :link="followingLink"
      :text="followingText"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script>
import BaseLink from '@/links/BaseLink.vue'
import {
  followers as formatProfileFollowersLink,
  following as formatProfileFollowingLink
} from '#/formatters/links/profile'

export default {
  name: 'BaseProfileFollowingCount',
  components: {
    BaseLink
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'activeLinkChange'
  ],
  computed: {
    followersLink () {
      return formatProfileFollowersLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileData.id
    },
    followersText () {
      return this.$t(
        'counters.followers',
        { count: this.followersCountStrong }
      )
    },
    followersCountStrong () {
      return `<strong>${this.followersCount}</strong>`
    },
    followersCount () {
      return this.profileData.follower_profiles_count
    },
    followingLink () {
      return formatProfileFollowingLink({
        profileId: this.profileId
      })
    },
    followingText () {
      return this.$t(
        'counters.following',
        { count: this.followingCountStrong }
      )
    },
    followingCountStrong () {
      return `<strong>${this.followingCount}</strong>`
    },
    followingCount () {
      return this.profileData.following_profiles_count
    }
  },
  methods: {
    handleMouseEnter () {
      this.changeActiveLink(true)
    },
    handleMouseLeave () {
      this.changeActiveLink(false)
    },
    changeActiveLink (value) {
      this.$emit(
        'activeLinkChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
