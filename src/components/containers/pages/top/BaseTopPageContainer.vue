<template>
  <BasePageContainer
    :response-data="responseData"
  >
    <slot
      :top-data="topData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
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
    isFetchData: {
      type: Boolean,
      default: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      error: null,
      topData: null,
      isLoading: false,
      responseData: {}
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

    if (this.isFetchData) {
      this.fetchData()
    }
  },
  methods: {
    getTop,
    fetchData (
      page
    ) {
      this.getTop(
        {
          ...this.topArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
