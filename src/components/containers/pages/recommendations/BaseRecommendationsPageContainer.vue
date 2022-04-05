<template>
  <BasePageContainer
    :responseData="recommendationsData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :recommendationsData="recommendationsData"
      :profileId="profileId"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState } from 'vuex'
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
  props: {
    limit: Number,
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    navigationSections () {
      return formatRecommendationsPageNavigation()
    },
    tabData () {
      return formatRecommendationsPageTab()
    },
    recommendationsArgs () {
      return {
        limit: this.limit,
        filter: this.filter,
        filterValue: this.filterValue
      }
    },
    profileId () {
      return this.profileInfo.id.toString()
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
    getRecommendations,
    fetchData (page) {
      this.getRecommendations({
        ...this.recommendationsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
