<template>
  <div class="main-right-column">
    <StatisticsSegment
      :artist-data="artistData"
    />

    <TabsSegment
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
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
    artistData: Object,
    libraryArtistId: String
  }
}
</script>

<style lang="sass" scoped></style>
