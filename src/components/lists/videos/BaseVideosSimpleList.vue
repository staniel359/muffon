<template>
  <BaseListContainer class="selection">
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :videoData="videoData"
      @linkClick="handleLinkClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
import VideoItem from './BaseVideosSimpleList/VideoItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseVideosSimpleList',
  components: {
    BaseListContainer,
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
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
