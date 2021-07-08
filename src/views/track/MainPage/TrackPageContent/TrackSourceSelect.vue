<template>
  <div class="track-source-select-container">
    <div class="track-source-select-content">
      <SourceSelect
        ref="source"
        :query="query"
      />

      <TrackSelect
        v-if="selectedSourceData"
        :key="trackSelectKey"
        :tracks="selectedSourceTracks"
      />
    </div>

    <BaseButton
      v-if="selectedSourceData"
      class="circular red basic compact tiny reset-button"
      icon="close"
      @click="handleReset"
    />
  </div>
</template>

<script>
import SourceSelect from './TrackSourceSelect/SourceSelect.vue'
import TrackSelect from './TrackSourceSelect/TrackSelect.vue'
import BaseButton from '@/BaseButton.vue'
import { generateKey } from '#/utils'
import formatTrackRequestData from '#/actions/api/track/formatters/requestData'

export default {
  name: 'TrackSourceSelect',
  components: {
    SourceSelect,
    TrackSelect,
    BaseButton
  },
  provide () {
    return {
      setSelectedSourceData: this.setSelectedSourceData,
      setSelectedTrackData: this.setSelectedTrackData
    }
  },
  inject: [
    'setRequestTrackData',
    'resetRequestTrackData'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedSourceData: null,
      selectedTrackData: null,
      trackSelectKey: null
    }
  },
  computed: {
    query () {
      return [
        this.artistName,
        this.trackTitle
      ].join(' - ')
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    selectedSourceTracks () {
      return this.selectedSourceData.tracks
    },
    selectedSourceId () {
      return this.selectedSourceData.id
    }
  },
  watch: {
    selectedSourceData: 'handleSelectedSourceDataChange',
    selectedTrackData: 'handleSelectedTrackDataChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.trackSelectKey = generateKey()
    },
    handleSelectedTrackDataChange (value) {
      this.setRequestTrackData({
        ...value
      })
    },
    handleReset () {
      this.$refs.source.reset()

      this.selectedSourceData = null

      this.resetRequestTrackData()
    },
    setSelectedSourceData (value) {
      this.selectedSourceData = value
    },
    setSelectedTrackData (value) {
      this.selectedTrackData =
        this.formatSelectedTrackData(value)
    },
    formatSelectedTrackData (value) {
      return formatTrackRequestData({
        sourceId: this.selectedSourceId,
        trackData: value
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.track-source-select-container
  @extend .d-flex, .align-items-center

.track-source-select-content
  @extend .d-flex, .align-items-center, .flex-full

.reset-button
  @extend .no-margin
</style>
