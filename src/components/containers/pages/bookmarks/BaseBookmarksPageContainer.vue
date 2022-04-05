<template>
  <BasePageContainer
    :responseData="profileData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :bookmarksData="bookmarksData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
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
      return this.profileData?.bookmarks
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getBookmarks,
    fetchData (page) {
      this.getBookmarks({
        ...this.bookmarksArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
