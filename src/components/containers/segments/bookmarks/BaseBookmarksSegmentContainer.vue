<template>
  <div
    ref="segment"
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :bookmarks-data="bookmarksData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getBookmarks from '*/helpers/actions/api/bookmarks/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseBookmarksSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    bookmarksArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    bookmarksData () {
      return this.profileData?.bookmarks
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getBookmarks,
    fetchData (
      page
    ) {
      this.getBookmarks(
        {
          ...this.bookmarksArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
