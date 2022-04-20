<template>
  <slot
    v-bind="$attrs"
    :icon="icon"
    :text="followText"
    :is-loading="isLoading"
    :is-following="isFollowing"
    :on-click="onClick"
  />
</template>

<script>
import createFollower from '*/helpers/actions/api/follower/create'
import deleteFollower from '*/helpers/actions/api/follower/delete'

export default {
  name: 'BaseProfileFollowButtonContainer',
  inject: [
    'setIsFollowing',
    'setFollowersCount'
  ],
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
  data () {
    return {
      followersCount: null,
      isFollowing: false,
      isLoading: false
    }
  },
  computed: {
    icon () {
      if (this.isFollowing) {
        return 'minus'
      } else {
        return 'plus'
      }
    },
    followText () {
      return this.$t(
        `relationships.${this.followTextKey}`
      )
    },
    followTextKey () {
      if (this.isFollowing) {
        return 'unfollow'
      } else {
        return 'follow'
      }
    },
    isFollower () {
      return this.profileData.other_profile.follower_of_profile
    },
    followerData () {
      return {
        otherProfileId: this.otherProfileId
      }
    },
    otherProfileId () {
      return this.profileData.id.toString()
    }
  },
  watch: {
    isFollowing: 'handleIsFollowingChange',
    followersCount: 'handleFollowersCountChange'
  },
  mounted () {
    this.isFollowing = this.isFollower
  },
  methods: {
    createFollower,
    deleteFollower,
    handleIsFollowingChange (
      value
    ) {
      this.setIsFollowing(
        value
      )
    },
    handleFollowersCountChange (
      value
    ) {
      this.setFollowersCount(
        value
      )
    },
    onClick () {
      if (this.isFollowing) {
        this.unfollow()
      } else {
        this.follow()
      }

      this.$emit(
        'click'
      )
    },
    follow () {
      this.createFollower(
        this.followerData
      )
    },
    unfollow () {
      this.deleteFollower(
        this.followerData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
