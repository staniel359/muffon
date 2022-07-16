<template>
  <div class="left-column">
    <div
      :class="[
        'ui raised segments',
        'main-segment-container'
      ]"
    >
      <MembersSegment
        :community-data="communityData"
      />

      <JoinSegment
        :community-data="communityData"
      />

      <CreatorSegment
        :creator-data="creatorData"
      />
    </div>
  </div>
</template>

<script>
import MembersSegment from './LeftColumn/MembersSegment.vue'
import JoinSegment from './LeftColumn/JoinSegment.vue'
import CreatorSegment from './LeftColumn/CreatorSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    MembersSegment,
    JoinSegment,
    CreatorSegment
  },
  props: {
    communityData: Object
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
  width: 175px
</style>
