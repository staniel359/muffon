<template>
  <BaseTrackPageContainer
    ref="page"
    :source-params="sourceParams"
  >
    <template
      #default="slotProps"
    >
      <div class="ui raised segments main-segment-container">
        <SourceSelectSegment
          :track-data="slotProps.trackData"
        />

        <TrackSegment
          :track-data="slotProps.trackData"
          :request-track-data="slotProps.requestTrackData"
          :is-loading="slotProps.isLoading"
          :error="slotProps.error"
          @refresh="handleRefresh"
        />
      </div>

      <TabsSegment
        :track-data="slotProps.trackData"
      />
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/components/containers/pages/track/BaseTrackPageContainer.vue'
import SourceSelectSegment from './MainPage/SourceSelectSegment.vue'
import TrackSegment from './MainPage/TrackSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    SourceSelectSegment,
    TrackSegment,
    TabsSegment
  },
  props: {
    trackTitle: String,
    artistName: String
  },
  computed: {
    sourceParams () {
      return {
        source: this.sourceData,
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    },
    sourceData () {
      const {
        query
      } = this.$route

      return {
        name: query.source,
        id: query.track_id,
        artist_id: query.artist_id
      }
    }
  },
  methods: {
    handleRefresh () {
      this.$refs
        .page
        .getData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
