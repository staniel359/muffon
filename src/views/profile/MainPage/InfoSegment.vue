<template>
  <BaseSegmentContainer
    class="main-segment-container"
  >
    <MainInfoSection
      :profileData="profileData"
    />

    <ExtraInfoSection
      :profileData="profileData"
    />

    <FollowSection
      v-if="isRenderFollowSection"
      :profileData="profileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import MainInfoSection from './InfoSegment/MainInfoSection.vue'
import ExtraInfoSection from './InfoSegment/ExtraInfoSection.vue'
import FollowSection from './InfoSegment/FollowSection.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    MainInfoSection,
    ExtraInfoSection,
    FollowSection
  },
  props: {
    profileData: Object
  },
  computed: {
    isRenderFollowSection () {
      return !isCurrentProfile(
        this.profileId
      )
    },
    profileId () {
      return this.profileData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
