<template>
  <BasePageContainer
    :isShowLoader="!communitiesData"
    :isLoading="isLoading"
    :isError="!communitiesData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="communitiesData"
      :isLoading="isLoading"
      :error="error"
      :communitiesData="communitiesData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  communities as formatCommunitiesPageNavigation
} from '#/formatters/navigation'
import formatCommunitiesPageTab from '#/formatters/tabs/communities'
import getCommunities from '#/actions/api/communities/get'

export default {
  name: 'BaseCommunitiesPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    responsePageLimit: Number
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
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getCommunities,
    fetchData (page) {
      this.getCommunities({
        ...this.communitiesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
