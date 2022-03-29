<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseProfileLibraryStatistics
      :libraryData="libraryData"
      :profileId="profileId"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryStatistics
  from '*/components/models/profile/library/BaseProfileLibraryStatistics.vue'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryStatistics
  },
  props: {
    libraryData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
