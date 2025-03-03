<template>
  <div class="main-right-column">
    <BaseSegmentsContainer>
      <StatisticsSegment
        :album-data="albumData"
      />

      <PlayButtonSegment
        v-if="isAnyTracks"
        :profile-id="profileId"
        :library-album-id="libraryAlbumId"
      />
    </BaseSegmentsContainer>

    <TabsSegment
      :profile-id="profileId"
      :library-album-id="libraryAlbumId"
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
    albumData: {
      type: Object,
      required: true
    },
    profileId: Number,
    libraryAlbumId: Number
  },
  computed: {
    isAnyTracks () {
      return !!this.albumData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
