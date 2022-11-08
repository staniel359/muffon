<template>
  <div>
    <SelectSection
      :scope="scope"
      :query="query"
    />

    <VideoSection
      v-if="selectedVideoData"
      :key="key"
      :selected-video-data="selectedVideoData"
    />
  </div>
</template>

<script>
import SelectSection from './BaseTrackVideoSelect/SelectSection.vue'
import VideoSection from './BaseTrackVideoSelect/VideoSection.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseTrackVideoSelect',
  components: {
    SelectSection,
    VideoSection
  },
  provide () {
    return {
      setSelectedVideoData:
        this.setSelectedVideoData
    }
  },
  props: {
    query: String,
    isShow: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      key: null,
      selectedVideoData: null,
      scope: 'videos'
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
