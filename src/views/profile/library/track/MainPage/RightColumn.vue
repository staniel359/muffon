<template>
  <div class="main-right-column">
    <PlayerSegment
      :track-data="trackData"
    />

    <StatisticsSegment
      :track-data="trackData"
    />

    <TabsSegment
      :profile-id="profileId"
      :library-track-id="libraryTrackId"
    />
  </div>
</template>

<script>
import PlayerSegment from './RightColumn/PlayerSegment.vue'
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import TabsSegment from './RightColumn/TabsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    PlayerSegment,
    StatisticsSegment,
    TabsSegment
  },
  props: {
    profileId: String,
    trackData: Object,
    libraryTrackId: String
  }
}
</script>

<style lang="sass" scoped></style>
