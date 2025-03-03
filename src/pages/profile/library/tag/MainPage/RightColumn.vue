<template>
  <div class="main-right-column">
    <StatisticsSegment
      :tag-data="tagData"
    />

    <TabsSegment
      :profile-id="profileId"
      :library-tag-id="libraryTagId"
    />
  </div>
</template>

<script>
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import TabsSegment from './RightColumn/TabsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    StatisticsSegment,
    TabsSegment
  },
  props: {
    profileId: Number,
    tagData: Object,
    libraryTagId: Number
  }
}
</script>

<style lang="sass" scoped></style>
