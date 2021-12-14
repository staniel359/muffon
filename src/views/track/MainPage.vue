<template>
  <BaseTrackPageContainer
    :trackTitle="trackTitle"
    :artistName="artistName"
    :sourceParams="sourceParams"
  >
    <template #default="slotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <TrackSourceSelect
            :trackData="slotProps.trackData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="track-segment"
          :isLoading="slotProps.isLoading"
          :error="slotProps.error"
          @init="handleInit"
          @refresh="slotProps.handleRefresh"
        >
          <template #default>
            <LeftColumn
              v-if="scrollable"
              :trackData="slotProps.trackData"
              :scrollable="scrollable"
            />

            <RightColumn
              :trackData="slotProps.trackData"
            />
          </template>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import TrackSourceSelect from './MainPage/TrackSourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    TrackSourceSelect,
    LeftColumn,
    RightColumn
  },
  props: {
    trackTitle: String,
    artistName: String
  },
  data () {
    return {
      scrollable: null
    }
  },
  computed: {
    sourceParams () {
      return {
        sourceId: this.sourceId,
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        trackId: this.trackId,
        artistId: this.artistId,
        track: this.track,
        artist: this.artist
      }
    },
    sourceId () {
      return this.$route.query.source_id
    },
    trackId () {
      return this.$route.query.track_id
    },
    artistId () {
      return this.$route.query.artist_id
    },
    track () {
      return this.$route.query.track
    },
    artist () {
      return this.$route.query.artist
    }
  },
  methods: {
    handleInit (el) {
      this.scrollable = el
    }
  }
}
</script>

<style lang="sass" scoped>
.track-segment
  @extend .flex-full, .d-flex
</style>
