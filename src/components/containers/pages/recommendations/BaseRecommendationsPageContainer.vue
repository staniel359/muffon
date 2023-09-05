<template>
  <BasePageContainer
    :response-data="recommendationsData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :recommendations-data="recommendationsData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatRecommendationsPageNavigation
  from '@/helpers/formatters/navigation/recommendations'
import formatRecommendationsPageTab
  from '@/helpers/formatters/tabs/recommendations'
import getRecommendations from '@/helpers/actions/api/recommendations/get'

export default {
  name: 'BaseRecommendationsPageContainer',
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
    limit: Number,
    order: String,
    filterArgs: Object
  },
  data () {
    return {
      recommendationsData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatRecommendationsPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        scope: this.scope
      }
    },
    tabData () {
      return formatRecommendationsPageTab(
        this.navigationData
      )
    },
    recommendationsArgs () {
      return {
        scope: this.scope,
        limit: this.limit,
        order: this.order,
        ...this.filterArgs
      }
    }
  },
  watch: {
    recommendationsData:
      'handleNavigationDataChange'
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    } else {
      this.recommendationsData = {}
    }
  },
  methods: {
    getRecommendations,
    getData (
      {
        page
      } = {}
    ) {
      this.getRecommendations(
        {
          ...this.recommendationsArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
