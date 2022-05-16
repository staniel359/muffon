<template>
  <BaseTrackPageContainer
    ref="page"
    :source-params="sourceParams"
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
          <SourceSelect
            :track-data="slotProps.trackData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="track-segment"
          :is-loading="slotProps.isLoading"
          :error="slotProps.error"
          @init="handleInit"
          @refresh="handleRefresh"
        >
          <LeftColumn
            v-if="scrollable"
            :track-data="slotProps.trackData"
            :scrollable="scrollable"
          />

          <RightColumn
            :track-data="slotProps.trackData"
            :request-track-data="slotProps.requestTrackData"
          />
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '*/components/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import SourceSelect from './MainPage/SourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    SourceSelect,
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
        source: this.source,
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        trackId: this.trackId,
        artistId: this.artistId,
        track: this.track,
        artist: this.artist
      }
    },
    source () {
      return this.$route.query.source
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
    handleRefresh () {
      this.$refs
        .page
        .getData()
    },
    handleInit (
      element
    ) {
      this.scrollable = element
    }
  }
}
</script>

<style lang="sass" scoped>
.track-segment
  @extend .flex-full, .d-flex
</style>
