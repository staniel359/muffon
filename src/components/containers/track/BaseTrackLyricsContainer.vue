<template>
  <BaseSegmentContainer
    class="basic"
    :isLoading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="lyrics"
      :lyrics="lyrics"
      :trackId="trackId"
    ></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import getTrack from '*/helpers/actions/api/track/get'

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
      error: null,
      trackData: null,
      isLoading: false
    }
  },
  computed: {
    trackArgs () {
      return {
        sourceId: 'genius',
        trackId: this.trackId
      }
    },
    trackId () {
      return this.selectedTrackData.genius_id
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
    handleSelectedTrackDataChange () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    handleTrackDataChange () {
      this.$emit('focus')
    },
    getTrack,
    fetchData () {
      this.getTrack(
        this.trackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
