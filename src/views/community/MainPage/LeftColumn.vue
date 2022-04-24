<template>
  <div class="left-column">
    <div
      :class="[
        'ui raised segments',
        'main-segment-container'
      ]"
    >
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
import JoinSegment from './LeftColumn/JoinSegment.vue'
import CreatorSegment from './LeftColumn/CreatorSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
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
