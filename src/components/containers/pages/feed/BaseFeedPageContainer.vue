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
import formatFeedPageTab from '*/helpers/formatters/tabs/feed'
import getFeed from '*/helpers/actions/api/feed/get'

export default {
  name: 'BaseFeedPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setIsGlobal: this.setIsGlobal
    }
  },
  props: {
    limit: Number
  },
  data () {
    return {
      feedData: null,
      error: null,
      isGlobal: false,
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
        limit: this.limit,
        isGlobal: this.isGlobal
      }
    }
  },
  watch: {
    feedData: 'handleNavigationDataChange',
    isGlobal: 'handleIsGlobalChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getFeed,
    handleIsGlobalChange () {
      this.getData()
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getFeed(
        {
          ...this.feedArgs,
          page
        }
      )
    },
    setIsGlobal (
      value
    ) {
      this.isGlobal = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
