<template>
  <div>
    <BaseTrackVideoSourceSelect
      :track-data="trackData"
    />

    <VideoSection
      v-if="selectedVideoData"
      ref="video"
      :key="videoSectionKey"
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
} from '@/helpers/utils'
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

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
    trackData: Object
  },
  data () {
    return {
      videoSectionKey: null,
      selectedVideoData: null
    }
  },
  watch: {
    selectedVideoData:
      'handleSelectedVideoDataChange'
  },
  methods: {
    async handleSelectedVideoDataChange () {
      this.videoSectionKey = generateKey()

      await this.$nextTick()

      this.focus()
    },
    setSelectedVideoData (
      value
    ) {
      this.selectedVideoData = {
        ...value
      }
    },
    focus () {
      focusOnPageElement(
        this.$refs.video.$el
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
