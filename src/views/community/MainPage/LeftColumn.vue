<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-sticky-container',
      'left-column'
    ]"
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

    <CreatorSegment
      :creator-data="creatorData"
    />

    <BaseCreatedSegment
      class="main-community-info-segment"
      model="community"
      :model-data="communityData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import JoinedSegment from './LeftColumn/JoinedSegment.vue'
import MembersSegment from './LeftColumn/MembersSegment.vue'
import CreatorSegment from './LeftColumn/CreatorSegment.vue'
import BaseCreatedSegment from '@/components/segments/BaseCreatedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    JoinedSegment,
    MembersSegment,
    CreatorSegment,
    BaseCreatedSegment
  },
  props: {
    communityData: Object,
    scrollable: HTMLDivElement
  },
  computed: {
    creatorData () {
      return this.communityData.creator
    }
  }
}
</script>

<style lang="sass" scoped>
.left-column
  @extend .no-margin
  width: 180px
</style>
