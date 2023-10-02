<template>
  <div class="main-model-source-select-container">
    <div class="content">
      <div>
        <SourceSelect
          ref="select"
          :query="query"
        />

        <div
          v-if="isRenderTypeSelect"
          class="bottom-section"
        >
          <TypeSelect
            :key="typeSelectKey"
            :videos-data="selectedSourceVideosData"
            :types="selectedSourceTypes"
          />
        </div>

        <div
          v-if="isRenderVideoSelect"
          class="bottom-section"
        >
          <VideoSelect
            :key="videoSelectKey"
            :videos="selectedTypeVideos"
            :type-id="selectedTypeId"
          />
        </div>
      </div>
    </div>

    <BaseClearButton
      v-if="selectedSourceData"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SourceSelect from './BaseTrackVideoSourceSelect/SourceSelect.vue'
import TypeSelect from './BaseTrackVideoSourceSelect/TypeSelect.vue'
import VideoSelect from './BaseTrackVideoSourceSelect/VideoSelect.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseTrackVideoSourceSelect',
  components: {
    SourceSelect,
    TypeSelect,
    VideoSelect,
    BaseClearButton
  },
  provide () {
    return {
      setSelectedSourceData:
        this.setSelectedSourceData,
      setSelectedTypeId:
        this.setSelectedTypeId
    }
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'reset'
  ],
  data () {
    return {
      videoSelectKey: null,
      selectedSourceData: null,
      selectedTypeId: null,
      typeSelectKey: null
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
    isSelectedSourceWithMultipleTypes () {
      return this.selectedSourceTypes.length > 1
    },
    selectedSourceTypes () {
      return this.selectedSourceData.types
    },
    selectedSourceVideosData () {
      return this.selectedSourceData.videosData
    },
    selectedTypeVideos () {
      return this.selectedSourceVideosData[
        this.selectedScope
      ]
    },
    selectedScope () {
      if (this.selectedTypeId) {
        return `${this.selectedTypeId}s`
      } else {
        return null
      }
    },
    isRenderTypeSelect () {
      return (
        this.selectedSourceData &&
          this.isSelectedSourceWithMultipleTypes
      )
    },
    isRenderVideoSelect () {
      return (
        this.selectedSourceData &&
          this.selectedTypeId
      )
    }
  },
  watch: {
    selectedSourceData:
      'handleSelectedSourceDataChange',
    selectedTypeId:
      'handleSelectedTypeIdChange'
  },
  methods: {
    handleSelectedSourceDataChange () {
      this.typeSelectKey = generateKey()

      this.videoSelectKey = generateKey()
    },
    handleSelectedTypeIdChange () {
      this.videoSelectKey = generateKey()
    },
    handleClearButtonClick () {
      this.resetSelect()

      this.selectedSourceData = null

      this.$emit(
        'reset'
      )
    },
    setSelectedSourceData (
      value
    ) {
      this.selectedSourceData = value

      if (this.isSelectedSourceWithMultipleTypes) {
        this.selectedTypeId = null
      } else {
        this.selectedTypeId =
          this.selectedSourceTypes[0]
      }
    },
    setSelectedTypeId (
      value
    ) {
      this.selectedTypeId = value
    },
    resetSelect () {
      this.$refs
        .select
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
