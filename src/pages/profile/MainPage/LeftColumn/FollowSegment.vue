<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <FollowersSection
      :profile-data="profileData"
    />

    <FollowingSection
      :profile-data="profileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import FollowersSection from './FollowSegment/FollowersSection.vue'
import FollowingSection from './FollowSegment/FollowingSection.vue'

export default {
  name: 'FollowSegment',
  components: {
    BaseSegmentContainer,
    FollowersSection,
    FollowingSection
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped></style>
