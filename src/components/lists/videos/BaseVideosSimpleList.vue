<template>
  <BaseListContainer class="selection">
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :video-data="videoData"
      :is-with-channel-title="isWithChannelTitle"
      :is-with-share-option="isWithShareOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-clearable="isClearable"
      @link-click="handleLinkClick"
      @delete-option-click="handleDeleteOptionClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import VideoItem from './BaseVideosSimpleList/VideoItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean
  },
  emits: [
    'linkClick',
    'deleteOptionClick'
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
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'deleteOptionClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
