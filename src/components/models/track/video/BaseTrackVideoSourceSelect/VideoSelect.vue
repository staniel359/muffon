<template>
  <BaseDropdownContainer
    class="main-source-select-item-select video-select"
    :header="headerText"
    @select="handleSelect"
  >
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :video-data="videoData"
      :is-image-contained="isImageContained"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import VideoItem from './VideoSelect/VideoItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'VideoSelect',
  components: {
    BaseDropdownContainer,
    VideoItem
  },
  inject: [
    'setSelectedVideoData'
  ],
  props: {
    typeId: {
      type: String,
      required: true
    },
    videos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    headerText () {
      return this.$t(
        `select.${this.typeId}`
      )
    },
    videosCollection () {
      return formatCollection(
        this.videos
      )
    },
    isImageContained () {
      return (
        this.typeId === 'track'
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      function isMatchedVideo (
        videoData
      ) {
        return (
          videoData.uuid === value
        )
      }

      const videoData =
        this.videosCollection.find(
          isMatchedVideo
        )

      this.setSelectedVideoData(
        videoData
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.video-select
  width: 220px
  ::v-deep(.image)
    width: 40px !important
</style>
