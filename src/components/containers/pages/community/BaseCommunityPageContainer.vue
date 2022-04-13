<template>
  <BasePageContainer
    :response-data="communityData"
    :is-loading="isLoading"
    :error="error"
  >
    <template #default="slotProps">
      <slot
        :community-data="communityData"
        :community-creator-id="communityCreatorId"
        :profile-id="slotProps.profileId"
      />
    </template>
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
      setCommunityData: this.setCommunityData,
      setIsMember: this.setIsMember,
      setMembersCount: this.setMembersCount
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
    },
    communityCreatorId () {
      return this.communityData?.creator?.id?.toString()
    }
  },
  watch: {
    communityData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getCommunity,
    fetchData () {
      this.getCommunity(
        this.communityArgs
      )
    },
    setCommunityData (
      value
    ) {
      this.communityData = value
    },
    setIsMember (
      value
    ) {
      this.communityData
        .profile
        .member_of_community = value
    },
    setMembersCount (
      value
    ) {
      this.communityData
        .members_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
