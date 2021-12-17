<template>
  <div class="main-source-select-container">
    <div class="main-source-select-content">
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

    <BaseClearButton
      v-if="selectedSourceData"
      @click="handleReset"
    />
  </div>
</template>

<script>
import SourceSelect from './BaseTrackSourceSelect/SourceSelect.vue'
import TrackSelect from './BaseTrackSourceSelect/TrackSelect.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import { generateKey } from '#/utils'
import formatTrackRequestData from '#/formatters/request/track/requestData'

export default {
  name: 'BaseTrackSourceSelect',
  components: {
    SourceSelect,
    TrackSelect,
    BaseClearButton
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

<style lang="sass" scoped></style>
