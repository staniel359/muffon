<template>
  <BasePageContainer
    :response-data="communitiesData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :communities-data="communitiesData"
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
import {
  communities as formatCommunitiesPageNavigation
} from '*/helpers/formatters/navigation'
import formatCommunitiesPageTab from '*/helpers/formatters/tabs/communities'
import getCommunities from '*/helpers/actions/api/communities/get'

export default {
  name: 'BaseCommunitiesPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    limit: Number
  },
  data () {
    return {
      communitiesData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatCommunitiesPageNavigation()
    },
    tabData () {
      return formatCommunitiesPageTab()
    },
    communitiesArgs () {
      return {
        limit: this.limit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    getCommunities,
    fetchData (
      page
    ) {
      this.getCommunities(
        {
          ...this.communitiesArgs,
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
