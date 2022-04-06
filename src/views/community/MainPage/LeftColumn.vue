<template>
  <div class="ui raised segments main-segment-container left-column">
    <JoinSegment
      :communityData="communityData"
    />

    <CreatorSegment
      :creatorData="creatorData"
    />
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
