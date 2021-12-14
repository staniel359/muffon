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
import postProfileFollowersData from '#/actions/api/followers/postData'
import deleteProfileFollowerData from '#/actions/api/follower/deleteData'

export default {
  name: 'BaseProfileFollowButtonContainer',
  inject: [
    'setIsFollowing'
  ],
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
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
        `shared.profile.${this.followTextKey}`
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
    isFollowing: 'handleIsFollowingChange'
  },
  mounted () {
    this.isFollowing = this.isFollower
  },
  methods: {
    handleIsFollowingChange (value) {
      this.setIsFollowing(value)
    },
    onClick () {
      if (this.isFollowing) {
        this.unfollow()
      } else {
        this.follow()
      }
    },
    follow () {
      this.postProfileFollowersData(
        this.followerData
      ).then(
        this.handleFollowSuccess
      )
    },
    handleFollowSuccess () {
      this.isFollowing = true
    },
    unfollow () {
      this.deleteProfileFollowerData(
        this.followerData
      ).then(
        this.handleUnfollowSuccess
      )
    },
    handleUnfollowSuccess () {
      this.isFollowing = false
    },
    postProfileFollowersData,
    deleteProfileFollowerData
  }
}
</script>

<style lang="sass" scoped></style>
