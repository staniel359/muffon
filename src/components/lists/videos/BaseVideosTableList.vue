<template>
  <div class="ui four column relaxed grid">
    <div
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      class="column"
    >
      <VideoItem
        :video-data="videoData"
        :is-with-channel-title="isWithChannelTitle"
        :is-with-created="isWithCreated"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-watched-option="isWithWatchedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-external-link-option="isWithExternalLinkOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-bookmark="isBookmark"
        :is-favorite="isFavorite"
        @link-click="handleLinkClick"
      />
    </div>
  </div>
</template>

<script>
import VideoItem from './BaseVideosTableList/VideoItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
    isWithChannelTitle: Boolean,
    isWithCreated: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
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
