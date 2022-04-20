<template>
  <BasePageContainer
    :response-data="feedData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :feed-data="feedData"
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
import {
  feed as formatFeedPageNavigation
} from '*/helpers/formatters/navigation'
import {
  feed as formatFeedPageTab
} from '*/helpers/formatters/tabs'
import getFeed from '*/helpers/actions/api/feed/get'

export default {
  name: 'BaseFeedPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    limit: Number
  },
  data () {
    return {
      feedData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatFeedPageNavigation()
    },
    tabData () {
      return formatFeedPageTab()
    },
    feedArgs () {
      return {
        limit: this.limit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    getFeed,
    fetchData (
      page
    ) {
      this.getFeed(
        {
          ...this.feedArgs,
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
