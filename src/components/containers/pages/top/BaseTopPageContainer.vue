<template>
  <BasePageContainer>
    <slot
      :isLoading="isLoading"
      :error="error"
      :topData="topData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTopPageNavigation from '#/formatters/navigation/top'
import formatTopPageTab from '#/formatters/tabs/top'
import fetchTopData from '#/actions/api/top/fetchData'

export default {
  name: 'BaseTopPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      isLoading: false,
      error: null,
      topData: null
    }
  },
  computed: {
    navigationSections () {
      return formatTopPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        pageNameKey: this.scope
      }
    },
    tabData () {
      return formatTopPageTab(
        this.navigationData
      )
    },
    topDataArgs () {
      return {
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchTopData,
    fetchData (page) {
      this.fetchTopData({
        ...this.topDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
