<template>
  <BaseOption
    :icon="icon"
    :text="followText"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'
import createFollower from '@/helpers/actions/api/follower/create'
import deleteFollower from '@/helpers/actions/api/follower/delete'

export default {
  name: 'FollowOption',
  components: {
    BaseOption
  },
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
      isLoading: false,
      isError: false
    }
  },
  computed: {
    icon () {
      if (this.isFollowing) {
        return 'profileUnfollow'
      } else {
        return 'profileFollow'
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
      return this.profileData.id
    }
  },
  watch: {
    isFollowing:
      'handleIsFollowingChange',
    followersCount:
      'handleFollowersCountChange'
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
    handleClick () {
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
