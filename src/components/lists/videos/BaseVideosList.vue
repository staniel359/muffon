<template>
  <Component
    :is="listComponent"
    :videos="videos"
    :is-with-channel-title="isWithChannelTitle"
    :is-with-favorite-option="isWithFavoriteOption"
    :is-with-bookmark-option="isWithBookmarkOption"
    :is-with-watched-option="isWithWatchedOption"
    :is-with-share-option="isWithShareOption"
    :is-with-clear-button="isWithClearButton"
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
    videos: Array,
    isWithChannelTitle: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean
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
