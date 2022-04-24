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
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  recommendations as formatRecommendationsPageNavigation
} from '*/helpers/formatters/navigation'
import formatRecommendationsPageTab
  from '*/helpers/formatters/tabs/recommendations'
import getRecommendations from '*/helpers/actions/api/recommendations/get'

export default {
  name: 'BaseRecommendationsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setFilterScope: this.setFilterScope,
      setFilterValue: this.setFilterValue
    }
  },
  props: {
    limit: Number
  },
  emits: [
    'reset'
  ],
  data () {
    return {
      recommendationsData: null,
      filterScope: null,
      filterValue: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatRecommendationsPageNavigation()
    },
    tabData () {
      return formatRecommendationsPageTab()
    },
    recommendationsArgs () {
      return {
        limit: this.limit,
        filterScope: this.filterScope,
        filterValue: this.filterValue
      }
    }
  },
  watch: {
    filterValue: 'handleFilterValueChange'
  },
  mounted () {
    this.setNavigation()

    this.getData()
  },
  methods: {
    getRecommendations,
    handleFilterValueChange () {
      this.getData()

      this.$emit(
        'reset'
      )
    },
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
    },
    setFilterScope (
      value
    ) {
      this.filterScope = value
    },
    setFilterValue (
      value
    ) {
      this.filterValue = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
