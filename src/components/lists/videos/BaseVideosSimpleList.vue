<template>
  <BaseListContainer
    class="selection"
  >
    <VideoItem
      v-for="videoData in videosCollection"
      :key="videoData.uuid"
      :scope="scope"
      :video-data="videoData"
      :is-with-channel-title="isWithChannelTitle"
      :is-with-created="isWithCreated"
      :profile-id="profileId"
      :is-favorite="isFavorite"
      :is-bookmark="isBookmark"
      :is-with-favorite-option="isWithFavoriteOption"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-watched-option="isWithWatchedOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-with-clear-button="isWithClearButton"
      :is-with-duration="isWithDuration"
      :is-with-views-count="isWithViewsCount"
      :is-with-description="isWithDescription"
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
    scope: {
      type: String,
      default: 'videos'
    },
    isWithChannelTitle: Boolean,
    isWithCreated: Boolean,
    profileId: Number,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithDuration: Boolean,
    isWithViewsCount: Boolean,
    isWithDescription: Boolean
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
