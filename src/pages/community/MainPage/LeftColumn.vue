<template>
  <BaseSegmentsContainer
    class="main-sticky-container left-column width-25"
  >
    <InfoSegment
      :community-data="communityData"
      :scrollable="scrollable"
    />

    <JoinedSegment
      :community-data="communityData"
    />

    <MembersSegment
      :community-data="communityData"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './LeftColumn/InfoSegment.vue'
import JoinedSegment from './LeftColumn/JoinedSegment.vue'
import MembersSegment from './LeftColumn/MembersSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseSegmentsContainer,
    InfoSegment,
    JoinedSegment,
    MembersSegment
  },
  props: {
    communityData: Object,
    scrollable: HTMLDivElement
  }
}
</script>

<style lang="sass" scoped>
.left-column
  min-width: 190px
</style>
