<template>
  <BaseSegmentContainer>
    <BaseProfileLibraryStatistics
      :library-data="libraryData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryStatistics
  from '@/components/models/profile/library/BaseProfileLibraryStatistics.vue'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryStatistics
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    libraryData () {
      return this.profileData.library
    }
  }
}
</script>

<style lang="sass" scoped></style>
