<template>
  <div class="ui basic segments main-basic-segment-container">
    <div
      class="ui segment main-segment"
      :class="{ loading: isLoading }"
    >
      <LyricsSelect
        :artistName="artistName"
        :trackTitle="trackTitle"
      />

      <BaseError
        v-if="error"
        :error="error"
        @refresh="handleRefresh"
      />
      <LyricsData
        v-else-if="lyrics"
        :lyrics="lyrics"
        :trackId="trackId"
      />
    </div>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import LyricsSelect from './LyricsSection/LyricsSelect.vue'
import LyricsData from './LyricsSection/LyricsData.vue'
import fetchTrackData from '#/actions/api/track/fetchData'

export default {
  name: 'LyricsSection',
  components: {
    BaseError,
    LyricsSelect,
    LyricsData
  },
  provide () {
    return {
      setSelectedTrackData: this.setSelectedTrackData
    }
  },
  props: {
    artistName: String,
    trackTitle: String
  },
  data () {
    return {
      error: null,
      selectedTrackData: null,
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
    selectedTrackData: 'handleSelectedTrackDataChange'
  },
  methods: {
    handleSelectedTrackDataChange () {
      this.fetchData()
    },
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    setSelectedTrackData (value) {
      this.selectedTrackData = value
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
