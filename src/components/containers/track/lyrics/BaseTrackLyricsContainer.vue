<template>
  <div
    class="ui segment main-segment"
    :class="{ loading: isLoading }"
  >
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot
      v-else-if="lyrics"
      :lyrics="lyrics"
      :trackId="trackId"
    ></slot>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import fetchTrackData from '#/actions/api/track/fetchData'

export default {
  name: 'BaseTrackLyricsContainer',
  components: {
    BaseError
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
      return this.selectedTrackData.path
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
      this.error = null

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
