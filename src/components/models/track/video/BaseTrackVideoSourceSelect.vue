<template>
  <div class="source-select-container">
    <SourceSelect
      ref="select"
      :query="query"
    />

    <template
      v-if="selectedSourceData"
    >
      <TypeSelect
        v-if="isSelectedSourceWithMultipleTypes"
        :key="typeSelectKey"
        :videos-data="selectedSourceVideosData"
        :types="selectedSourceTypes"
      />

      <VideoSelect
        v-if="selectedTypeId"
        :key="videoSelectKey"
        :class="{
          'video-select-top-margin':
            isSelectedSourceWithMultipleTypes
        }"
        :videos="selectedTypeVideos"
        :type-id="selectedTypeId"
      />

      <BaseClearButton
        :class="{
          'clear-button-top-margin': (
            selectedTypeId &&
            isSelectedSourceWithMultipleTypes
          )
        }"
        @click="handleClearButtonClick"
      />
    </template>
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

<style lang="sass" scoped>
.source-select-container
  @extend .d-inline-flex, .align-items-center
  flex-wrap: wrap

.video-select-top-margin
  @extend .no-margin
  margin-top: 1em !important

.clear-button-top-margin
  margin-top: 1em !important
</style>
