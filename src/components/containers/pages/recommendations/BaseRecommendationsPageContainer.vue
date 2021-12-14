<template>
  <BasePageContainer
    :isShowLoader="!recommendationsData"
    :isLoading="isLoading"
    :isError="!recommendationsData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="recommendationsData"
      :isLoading="isLoading"
      :error="error"
      :recommendationsData="recommendationsData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  recommendations as formatRecommendationsPageNavigation
} from '#/formatters/navigation'
import formatRecommendationsPageTab from '#/formatters/tabs/recommendations'
import fetchRecommendationsData from '#/actions/api/recommendations/fetchData'

export default {
  name: 'BaseRecommendationsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    responsePageLimit: Number,
    filter: String,
    filterValue: Array
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
      return formatRecommendationsPageNavigation()
    },
    tabData () {
      return formatRecommendationsPageTab()
    },
    recommendationsDataArgs () {
      return {
        limit: this.responsePageLimit,
        filter: this.filter,
        filterValue: this.filterValue
      }
    }
  },
  watch: {
    filterValue: 'handleFilterValueChange'
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFilterValueChange () {
      this.fetchData()
    },
    fetchRecommendationsData,
    fetchData (page) {
      this.fetchRecommendationsData({
        ...this.recommendationsDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
