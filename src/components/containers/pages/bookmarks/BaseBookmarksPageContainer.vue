<template>
  <BasePageContainer
    :response-data="bookmarksData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :bookmarks-data="bookmarksData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatBookmarksPageNavigation
  from '*/helpers/formatters/navigation/bookmarks'
import formatBookmarksPageTab from '*/helpers/formatters/tabs/bookmarks'
import getBookmarks from '*/helpers/actions/api/bookmarks/get'

export default {
  name: 'BaseBookmarksPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    isFetchData: {
      type: Boolean,
      default: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatBookmarksPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        scope: this.scope
      }
    },
    tabData () {
      return formatBookmarksPageTab(
        this.navigationData
      )
    },
    bookmarksArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    bookmarksData () {
      if (this.isFetchData) {
        return this.profileData?.bookmarks
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.setNavigation()

    if (this.isFetchData) {
      this.fetchData()
    }
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
