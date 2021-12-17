<template>
  <div class="ui four column grid">
    <div
      v-for="videoData in videosCollection"
      class="column"
      :key="videoData.uuid"
    >
      <VideoItem
        :videoData="videoData"
        :isWithChannelTitle="isWithChannelTitle"
        @linkClick="handleLinkClick"
      />
    </div>
  </div>
</template>

<script>
import VideoItem from './BaseVideosTableList/VideoItem.vue'
import { collection as formatCollection } from '#/formatters'

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
  computed: {
    videosCollection () {
      return formatCollection(
        this.videos
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
