<template>
  <BaseListContainer
    class="selection"
  >
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :video-data="videoData"
      :is-with-channel-title="isWithChannelTitle"
      :is-with-watched-option="isWithWatchedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-clear-button="isWithClearButton"
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import VideoItem from './BaseVideosSimpleList/VideoItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
    isWithChannelTitle: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
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
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'clearButtonClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
