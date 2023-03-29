<template>
  <div class="main-right-column">
    <StatisticsSegment
      :album-data="albumData"
    />

    <TabsSegment
      :profile-id="profileId"
      :library-album-id="libraryAlbumId"
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
    profileId: String,
    albumData: Object,
    libraryAlbumId: String
  }
}
</script>

<style lang="sass" scoped></style>
