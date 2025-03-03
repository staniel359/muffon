<template>
  <div class="main-right-column">
    <BaseSegmentsContainer>
      <StatisticsSegment
        :artist-data="artistData"
      />

      <PlayButtonSegment
        v-if="isAnyTracks"
        :profile-id="profileId"
        :library-artist-id="libraryArtistId"
      />
    </BaseSegmentsContainer>

    <TabsSegment
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
    />
  </div>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import PlayButtonSegment from './RightColumn/PlayButtonSegment.vue'
import TabsSegment from './RightColumn/TabsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    BaseSegmentsContainer,
    StatisticsSegment,
    PlayButtonSegment,
    TabsSegment
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: Number,
    libraryArtistId: Number
  },
  computed: {
    isAnyTracks () {
      return !!this.artistData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
