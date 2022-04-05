<template>
  <BasePageContainer
    :responseData="communityData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :communityData="communityData"
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
import formatCommunityPageNavigation
  from '*/helpers/formatters/navigation/community'
import formatCommunityPageTab from '*/helpers/formatters/tabs/community'
import getCommunity from '*/helpers/actions/api/community/get'

export default {
  name: 'BaseCommunityPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setCommunityData: this.setCommunityData
    }
  },
  props: {
    communityId: String,
    scope: String
  },
  data () {
    return {
      communityData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatCommunityPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        communityId: this.communityId,
        communityTitle: this.communityTitleFetched,
        scope: this.scope
      }
    },
    tabData () {
      return formatCommunityPageTab(
        this.navigationData
      )
    },
    communityTitleFetched () {
      return this.communityData?.title
    },
    communityArgs () {
      return {
        communityId: this.communityId
      }
    }
  },
  watch: {
    communityData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.fetchData()
    },
    getCommunity,
    fetchData () {
      this.getCommunity(
        this.communityArgs
      )
    },
    setCommunityData (value) {
      this.communityData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
