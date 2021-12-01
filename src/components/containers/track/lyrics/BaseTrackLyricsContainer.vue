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
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import fetchTrackData from '#/actions/api/track/fetchData'

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
  data () {
    return {
      error: null,
      trackData: null,
      isLoading: false
    }
  },
  computed: {
    trackDataArgs () {
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
    }
  },
  methods: {
    handleSelectedTrackDataChange () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    fetchTrackData,
    fetchData () {
      this.fetchTrackData(
        this.trackDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
