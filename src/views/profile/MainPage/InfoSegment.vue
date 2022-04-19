<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <MainInfoSection
      :profile-data="profileData"
    />

    <ExtraInfoSection
      :profile-data="profileData"
    />

    <template v-if="!isSelf">
      <FollowSection
        :profile-data="profileData"
      />

      <MessageSection
        :profile-data="profileData"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import MainInfoSection from './InfoSegment/MainInfoSection.vue'
import ExtraInfoSection from './InfoSegment/ExtraInfoSection.vue'
import FollowSection from './InfoSegment/FollowSection.vue'
import MessageSection from './InfoSegment/MessageSection.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
    isSelf () {
      return isCurrentProfile(
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
