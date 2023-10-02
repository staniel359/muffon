<template>
  <BaseTrackPageContainer
    :key="refreshKey"
    :scope="scope"
    :source-params="sourceParams"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentContainer
        class="raised main-segment-container main-page-segment-container"
      >
        <LyricsSection
          :lyrics="slotProps.trackData.lyrics"
        />
      </BaseSegmentContainer>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/components/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import LyricsSection from './LyricsPage/LyricsSection.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'LyricsPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    LyricsSection
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
  data () {
    return {
      scope: 'lyrics'
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
        id: query.track_id
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
