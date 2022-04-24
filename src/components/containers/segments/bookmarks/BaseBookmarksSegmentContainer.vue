<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :bookmarks-data="bookmarksData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '*/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getBookmarks from '*/helpers/actions/api/bookmarks/get'

export default {
  name: 'BaseBookmarksSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
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
      profileData: null,
      error: null,
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
    this.getData()
  },
  methods: {
    getBookmarks,
    getData (
      {
        page
      } = {}
    ) {
      this.getBookmarks(
        {
          ...this.bookmarksArgs,
          page
        }
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
