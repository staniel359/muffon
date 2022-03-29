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
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTopPageNavigation from '*/helpers/formatters/navigation/top'
import formatTopPageTab from '*/helpers/formatters/tabs/top'
import getTop from '*/helpers/actions/api/top/get'

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
    topArgs () {
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
    getTop,
    fetchData (page) {
      this.getTop({
        ...this.topArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
