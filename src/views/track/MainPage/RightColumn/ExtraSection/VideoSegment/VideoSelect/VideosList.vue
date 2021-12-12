<template>
  <VideoItem
    v-for="(videoData, index) in videosCollection"
    :key="videoData.uuid"
    :videoData="videoData"
    :index="index"
  />
</template>

<script>
import VideoItem from './VideosList/VideoItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'VideosList',
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
