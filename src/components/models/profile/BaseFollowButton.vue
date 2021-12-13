<template>
  <BaseButton
    :class="{
      primary: !isFollowing,
      loading: isLoading,
      disabled: isLoading
    }"
    :text="followText"
    :icon="icon"
    @click="handleButtonClick"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import postProfileFollowersData from '#/actions/api/profile/followers/postData'
import deleteProfileFollowerData
  from '#/actions/api/profile/follower/deleteData'

export default {
  name: 'BaseFollowButton',
  components: {
    BaseButton
  },
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
    isFollower () {
      return this.profileData.other_profile.follower_of_profile
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
    icon () {
      if (this.isFollowing) {
        return 'minus'
      } else {
        return 'plus'
      }
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
    handleButtonClick () {
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
