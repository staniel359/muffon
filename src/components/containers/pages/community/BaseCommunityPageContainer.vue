<template>
  <BasePageContainer
    :response-data="communityData"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot
      :community-data="communityData"
      :is-community-creator="isCommunityCreator"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatCommunityPageNavigation
  from '@/helpers/formatters/navigation/community'
import formatCommunityPageTab from '@/helpers/formatters/tabs/community'
import getCommunity from '@/helpers/actions/api/community/get'

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
      setCommunityData:
        this.setCommunityData,
      setIsMember:
        this.setIsMember,
      setMembersCount:
        this.setMembersCount
    }
  },
  props: {
    communityId: {
      type: Number,
      required: true
    },
    scope: String,
    limit: Number,
    order: String
  },
  emits: [
    'init'
  ],
  data () {
    return {
      communityData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    navigationSections () {
      return formatCommunityPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        communityId: this.communityId,
        communityTitle: this.communityTitle,
        scope: this.scope
      }
    },
    tabData () {
      return formatCommunityPageTab(
        this.navigationData
      )
    },
    communityTitle () {
      return this.communityData?.title
    },
    communityArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    isCommunityCreator () {
      return (
        this.profileId ===
          this.communityCreatorId
      )
    },
    communityCreatorId () {
      return this.communityData
        ?.creator
        ?.id
    }
  },
  watch: {
    communityData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getCommunity,
    handleInit (
      element
    ) {
      this.$emit(
        'init',
        element
      )
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getCommunity(
        {
          ...this.communityArgs,
          page
        }
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
