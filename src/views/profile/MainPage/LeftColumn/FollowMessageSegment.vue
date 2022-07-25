<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <FollowSection
      :profile-data="profileData"
    />

    <MessageSection
      :profile-data="profileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import FollowSection from './FollowMessageSegment/FollowSection.vue'
import MessageSection from './FollowMessageSegment/MessageSection.vue'

export default {
  name: 'FollowMessageSegment',
  components: {
    BaseSegmentContainer,
    FollowSection,
    MessageSection
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped></style>
