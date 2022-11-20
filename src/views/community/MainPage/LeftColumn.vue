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

    <MembersSegment
      :community-data="communityData"
    />

    <CreatorSegment
      :creator-data="creatorData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import MembersSegment from './LeftColumn/MembersSegment.vue'
import CreatorSegment from './LeftColumn/CreatorSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    MembersSegment,
    CreatorSegment
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
