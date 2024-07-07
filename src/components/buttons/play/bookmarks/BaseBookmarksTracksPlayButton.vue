<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getBookmarks from '@/helpers/actions/api/bookmarks/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseBookmarksTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    order: String
  },
  data () {
    return {
      bookmarksData: null
    }
  },
  computed: {
    bookmarksArgs () {
      return {
        scope: this.scope,
        limit: 'all',
        order: this.order
      }
    },
    tracksData () {
      return this.bookmarksData
    }
  },
  methods: {
    getBookmarks,
    getTracksData () {
      return this.getBookmarks(
        this.bookmarksArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
