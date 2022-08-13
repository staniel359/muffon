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
    isGetData: {
      type: Boolean,
      default: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      bookmarksData: null,
      error: null,
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
    }
  },
  watch: {
    bookmarksData: 'handleNavigationDataChange'
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    } else {
      this.bookmarksData = {}
    }
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
