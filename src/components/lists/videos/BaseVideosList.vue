<template>
  <Component
    :is="listComponent"
    :videos="videos"
    :profile-id="profileId"
    :is-with-channel-title="isWithChannelTitle"
    :is-with-favorite-option="isWithFavoriteOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-watched-option="isWithWatchedOption"
    :is-with-share-option="isWithShareOption"
    :is-with-external-link-option="isWithExternalLinkOption"
    :is-with-delete-option="isWithDeleteOption"
    :is-with-clear-button="isWithClearButton"
    :is-bookmark="isBookmark"
    :is-favorite="isFavorite"
  />
</template>

<script>
import BaseVideosSimpleList from './BaseVideosSimpleList.vue'
import BaseVideosTableList from './BaseVideosTableList.vue'

export default {
  name: 'BaseVideosList',
  components: {
    BaseVideosSimpleList,
    BaseVideosTableList
  },
  props: {
    viewId: {
      type: String,
      required: true
    },
    profileId: Number,
    videos: Array,
    isWithChannelTitle: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  data () {
    return {
      listComponentsData: {
        simple: 'BaseVideosSimpleList',
        table: 'BaseVideosTableList'
      }
    }
  },
  computed: {
    listComponent () {
      return this.listComponentsData[
        this.viewId
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
