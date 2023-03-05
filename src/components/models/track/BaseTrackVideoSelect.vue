<template>
  <div>
    <BaseTrackVideoSourceSelect
      :track-data="trackData"
      @reset="handleReset"
    />

    <VideoSection
      v-if="selectedVideoData"
      :key="key"
      :video-data="selectedVideoData"
    />
  </div>
</template>

<script>
import BaseTrackVideoSourceSelect
  from '@/components/models/track/video/BaseTrackVideoSourceSelect.vue'
import VideoSection from './BaseTrackVideoSelect/VideoSection.vue'
import {
  generateKey
} from '#/helpers/utils'

export default {
  name: 'BaseTrackVideoSelect',
  components: {
    BaseTrackVideoSourceSelect,
    VideoSection
  },
  provide () {
    return {
      setSelectedVideoData:
        this.setSelectedVideoData
    }
  },
  props: {
    trackData: Object,
    isShow: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      key: null,
      selectedVideoData: null
    }
  },
  watch: {
    selectedVideoData:
      'handleSelectedVideoDataChange',
    isShow: 'handleIsShowChange'
  },
  methods: {
    handleSelectedVideoDataChange (
      value
    ) {
      if (value) {
        this.key = generateKey()

        this.focus()
      }
    },
    handleIsShowChange (
      value
    ) {
      if (!value) {
        this.key = generateKey()
      }
    },
    handleReset () {
      this.selectedVideoData = null
    },
    setSelectedVideoData (
      value
    ) {
      this.selectedVideoData = {
        ...value
      }
    },
    focus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
