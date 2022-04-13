<template>
  <div class="ui four column grid">
    <div
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      class="column"
    >
      <VideoItem
        :video-data="videoData"
        :is-with-channel-title="isWithChannelTitle"
        @link-click="handleLinkClick"
      />
    </div>
  </div>
</template>

<script>
import VideoItem from './BaseVideosTableList/VideoItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseVideosTableList',
  components: {
    VideoItem
  },
  props: {
    videos: {
      type: Array,
      default () {
        return []
      }
    },
    isWithChannelTitle: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    videosCollection () {
      return formatCollection(
        this.videos
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
