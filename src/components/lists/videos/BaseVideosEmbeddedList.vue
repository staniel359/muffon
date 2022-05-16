<template>
  <div>
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :video-data="videoData"
    />
  </div>
</template>

<script>
import VideoItem from './BaseVideosEmbeddedList/VideoItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseVideosEmbeddedList',
  components: {
    VideoItem
  },
  props: {
    videos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    videosCollection () {
      return formatCollection(
        this.videos
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
