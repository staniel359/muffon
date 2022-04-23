<template>
  <BasePageContainer
    :response-data="releasesData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :releases-data="releasesData"
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
import formatReleasesPageNavigation
  from '*/helpers/formatters/navigation/releases'
import formatReleasesPageTab from '*/helpers/formatters/tabs/releases'
import getReleases from '*/helpers/actions/api/releases/get'

export default {
  name: 'BaseReleasesPageContainer',
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
      releasesData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatReleasesPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        scope: this.scope
      }
    },
    tabData () {
      return formatReleasesPageTab(
        this.navigationData
      )
    },
    releasesArgs () {
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
    } else {
      this.releasesData = {}
    }
  },
  methods: {
    getReleases,
    fetchData (
      page
    ) {
      this.getReleases(
        {
          ...this.releasesArgs,
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
