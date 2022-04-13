<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseProfileLibraryStatistics
      :library-data="libraryData"
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
    libraryData: Object
  }
}
</script>

<style lang="sass" scoped></style>
