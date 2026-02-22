<template>
  <BaseSegmentContainer
    class="basic"
    :response-data="trackData"
    :is-loading="isLoading"
    :error="error"
    :is-change-transparency="false"
    @refresh="handleRefresh"
  >
    <slot
      v-if="lyrics"
      :lyrics="lyrics"
      :track-id="trackId"
      :track-slug="trackSlug"
      :source="source"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import getTrack from '@/helpers/actions/api/track/get'

export default {
  name: 'BaseTrackLyricsContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    selectedTrackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      trackData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    trackArgs () {
      return {
        source: this.source,
        trackId: this.trackId,
        trackSlug: this.trackSlug
      }
    },
    source () {
      return this.selectedTrackData.source.name
    },
    trackId () {
      return this.selectedTrackData.source.id
    },
    trackSlug () {
      return this.selectedTrackData.source.slug
    },
    lyrics () {
      return this.trackData?.lyrics
    }
  },
  watch: {
    selectedTrackData: {
      immediate: true,
      handler: 'handleSelectedTrackDataChange'
    },
    trackData: 'handleTrackDataChange'
  },
  methods: {
    getTrack,
    handleSelectedTrackDataChange () {
      this.getData()
    },
    handleRefresh () {
      this.getData()
    },
    handleTrackDataChange () {
      this.$emit(
        'focus'
      )
    },
    getData () {
      this.getTrack(
        this.trackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
