<template>
  <slot
    v-bind="$attrs"
    :icon="icon"
    :text="followText"
    :isLoading="isLoading"
    :isFollowing="isFollowing"
    :onClick="onClick"
  ></slot>
</template>

<script>
import createFollower from '#/actions/api/follower/create'
import deleteFollower from '#/actions/api/follower/delete'

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
  mounted () {
    this.isFollowing = this.isFollower
  },
  methods: {
    onClick () {
      if (this.isFollowing) {
        this.unfollow()
      } else {
        this.follow()
      }

      this.$emit('click')
    },
    follow () {
      this.createFollower(
        this.followerData
      ).then(
        this.handleFollowSuccess
      )
    },
    handleFollowSuccess (response) {
      this.isFollowing = true

      this.setIsFollowing(true)
      this.setFollowersCount(
        response.data.other_profile_follower_profiles_count
      )
    },
    unfollow () {
      this.deleteFollower(
        this.followerData
      ).then(
        this.handleUnfollowSuccess
      )
    },
    handleUnfollowSuccess (response) {
      this.isFollowing = false

      this.setIsFollowing(false)
      this.setFollowersCount(
        response.data.other_profile_follower_profiles_count
      )
    },
    createFollower,
    deleteFollower
  }
}
</script>

<style lang="sass" scoped></style>
