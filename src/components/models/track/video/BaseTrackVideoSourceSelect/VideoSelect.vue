<template>
  <BaseDropdownContainer
    :header="headerText"
    @select="handleSelect"
  >
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :video-data="videoData"
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
        'select.video'
      )
    },
    videosCollection () {
      return formatCollection(
        this.videos
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

<style lang="sass" scoped></style>
