<template>
  <BaseTrackPageContainer
    ref="page"
    :key="refreshKey"
    :source-params="sourceParams"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentsContainer>
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
      </BaseSegmentsContainer>

      <TabsSegment
        :track-data="slotProps.trackData"
        :request-track-data="slotProps.requestTrackData"
      />
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/components/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import SourceSelectSegment from './MainPage/SourceSelectSegment.vue'
import TrackSegment from './MainPage/TrackSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseSegmentsContainer,
    BaseTrackPageContainer,
    SourceSelectSegment,
    TrackSegment,
    TabsSegment
  },
  mixins: [
    pageMixin
  ],
  props: {
    trackTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    }
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
