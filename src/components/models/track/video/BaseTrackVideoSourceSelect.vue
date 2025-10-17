<template>
  <div class="main-model-source-select-container">
    <div class="content">
      <div>
        <SourceSelect
          :query="query"
        />

        <div
          v-if="isRenderVideoSelect"
          class="main-bottom-section main-large-section"
        >
          <VideoSelect
            :key="videoSelectKey"
            :videos="selectedSourceVideos"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SourceSelect from './BaseTrackVideoSourceSelect/SourceSelect.vue'
import VideoSelect from './BaseTrackVideoSourceSelect/VideoSelect.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseTrackVideoSourceSelect',
  components: {
    SourceSelect,
    VideoSelect
  },
  provide () {
    return {
      setSelectedSourceData:
        this.setSelectedSourceData
    }
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      videoSelectKey: null,
      selectedSourceData: null
    }
  },
  computed: {
    query () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    isRenderVideoSelect () {
      return this.selectedSourceData
    },
    selectedSourceVideos () {
      return this.selectedSourceData.videos
    }
  },
  watch: {
    selectedSourceData:
      'handleSelectedSourceDataChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.videoSelectKey = generateKey()
    },
    setSelectedSourceData (
      value
    ) {
      this.selectedSourceData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
