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

    <FollowSegment
      :profile-data="profileData"
    />

    <OptionsSegment
      v-if="isRenderOptions"
      :profile-data="profileData"
    />

    <BaseCreatedSegment
      class="main-profile-page-info"
      model="profile"
      :model-data="profileData"
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
import FollowSegment from './LeftColumn/FollowSegment.vue'
import OptionsSegment from './LeftColumn/OptionsSegment.vue'
import BaseCreatedSegment from '@/components/segments/BaseCreatedSegment.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    ExtraInfoSegment,
    FollowSegment,
    OptionsSegment,
    BaseCreatedSegment
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
