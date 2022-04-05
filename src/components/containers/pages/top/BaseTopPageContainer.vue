<template>
  <BasePageContainer
    :responseData="{}"
  >
    <slot
      :topData="topData"
      :isLoading="isLoading"
      :error="error"
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
    limit: Number
  },
  data () {
    return {
      error: null,
      topData: null,
      isLoading: false
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
        scope: this.scope
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
        limit: this.limit
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
