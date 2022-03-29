<template>
  <BaseListContainer class="selection">
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :videoData="videoData"
      :isWithChannelTitle="isWithChannelTitle"
      @linkClick="handleLinkClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import VideoItem from './BaseVideosSimpleList/VideoItem.vue'
import { collection as formatCollection } from '*/helpers/formatters'

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
