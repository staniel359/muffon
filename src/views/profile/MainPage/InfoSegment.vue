<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <MainInfoSection
      :profileData="profileData"
    />

    <ExtraInfoSection
      :profileData="profileData"
    />

    <template v-if="isRenderProfileSection">
      <FollowSection
        :profileData="profileData"
      />

      <MessageSection
        :profileData="profileData"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import MainInfoSection from './InfoSegment/MainInfoSection.vue'
import ExtraInfoSection from './InfoSegment/ExtraInfoSection.vue'
import FollowSection from './InfoSegment/FollowSection.vue'
import MessageSection from './InfoSegment/MessageSection.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    MainInfoSection,
    ExtraInfoSection,
    FollowSection,
    MessageSection
  },
  props: {
    profileData: Object
  },
  computed: {
    isRenderProfileSection () {
      return !isCurrentProfile(
        this.profileId
      )
    },
    profileId () {
      return this.profileData.id.toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
