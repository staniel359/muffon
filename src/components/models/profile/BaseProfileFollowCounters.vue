<template>
  <div>
    <span
      class="followers"
      :class="{
        'main-link': isClickable
      }"
      @click="handleFollowersLinkClick"
      v-html="followersText"
    />

    <span
      class="following"
      :class="{
        'main-link': isClickable
      }"
      @click="handleFollowingLinkClick"
      v-html="followingText"
    />
  </div>
</template>

<script>
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'BaseProfileFollowCounters',
  props: {
    profileData: {
      type: Object,
      required: true
    },
    isClickable: Boolean
  },
  emits: [
    'followersLinkClick',
    'followingLinkClick'
  ],
  computed: {
    followersText () {
      return this.$t(
        'counters.followers',
        {
          count: this.followersCountStrong
        }
      )
    },
    followersCountStrong () {
      return `<strong>${this.followersCountFormatted}</strong>`
    },
    followersCountFormatted () {
      return formatNumber(
        this.followersCount
      )
    },
    followersCount () {
      return this.profileData.follower_profiles_count
    },
    followingText () {
      return this.$t(
        'counters.following',
        {
          count: this.followingCountStrong
        }
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
    handleFollowersLinkClick () {
      this.$emit(
        'followersLinkClick'
      )
    },
    handleFollowingLinkClick () {
      this.$emit(
        'followingLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
