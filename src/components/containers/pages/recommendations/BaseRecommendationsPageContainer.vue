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
import { mapState, mapActions } from 'vuex'
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
    pageNameKey: String,
    filter: String,
    filterValue: Array
  },
  data () {
    return {
      error: null,
      recommendationsData: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
        limit: this.responsePageLimit,
        filter: this.filter,
        filterValue: this.filterValue
      }
    }
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    },
    filterValue: 'handleFilterValueChange'
  },
  mounted () {
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
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    handleFilterValueChange () {
      this.fetchData()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatRecommendationsPageTab(
          this.navigationData
        )
      )
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
