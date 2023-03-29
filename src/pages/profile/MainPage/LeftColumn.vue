<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-profile-page-left-column',
      'main-sticky-container'
    ]"
  >
    <InfoSegment
      :profile-data="profileData"
    />

    <ExtraInfoSegment
      :profile-data="profileData"
    />

    <FollowingSegment
      v-if="isRenderFollowingSegment"
      :other-profile-data="otherProfileData"
    />

    <FollowSegment
      :profile-data="profileData"
    />

    <OptionsSegment
      v-if="isRenderOptions"
      :profile-data="profileData"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import InfoSegment from './LeftColumn/InfoSegment.vue'
import ExtraInfoSegment from './LeftColumn/ExtraInfoSegment.vue'
import FollowingSegment from './LeftColumn/FollowingSegment.vue'
import FollowSegment from './LeftColumn/FollowSegment.vue'
import OptionsSegment from './LeftColumn/OptionsSegment.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    ExtraInfoSegment,
    FollowingSegment,
    FollowSegment,
    OptionsSegment
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    ),
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    profileId () {
      return this.profileData.id
    },
    isRenderOptions () {
      return (
        this.currentProfileId &&
          !this.isSelf
      )
    },
    isRenderFollowingSegment () {
      return (
        this.isFollowing ||
          this.isFollowed
      )
    },
    isFollowing () {
      return this.otherProfileData?.follower_of_profile
    },
    otherProfileData () {
      return this.profileData.other_profile
    },
    isFollowed () {
      return this.otherProfileData?.followed_by_profile
    }
  }
}
</script>

<style lang="sass" scoped></style>
