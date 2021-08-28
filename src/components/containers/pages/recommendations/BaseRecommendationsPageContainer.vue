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
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatRecommendationsPageNavigation
  from '#/formatters/navigation/recommendations'
import formatRecommendationsPageTab from '#/formatters/tabs/recommendations'
import fetchRecommendationsData from '#/actions/api/recommendations/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseRecommendationsPageContainer',
  components: {
    BasePageContainer
  },
  props: {
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      error: null,
      recommendationsData: null,
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
        pageNameKey: this.pageNameKey
      }
    },
    recommendationsDataArgs () {
      return {
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.setNavigationSections(
      this.navigationSections
    )

    updateTab(
      formatRecommendationsPageTab(
        this.navigationData
      )
    )

    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
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
