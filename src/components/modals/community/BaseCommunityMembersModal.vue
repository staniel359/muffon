<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    response-data-name="communityData"
    :slot-props-data="slotPropsData"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template #default="slotProps">
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        @link-click="handleLinkClick"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '*/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'
import getCommunityMembers from '*/helpers/actions/api/community/get'

export default {
  name: 'BaseCommunityMembersModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BaseProfilesSimpleList
  },
  props: {
    communityId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      communityData: null,
      error: null,
      isLoading: false,
      limit: 50,
      scope: 'members'
    }
  },
  computed: {
    communityArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
        limit: this.limit
      }
    },
    slotPropsData () {
      return {
        communityData: this.communityData,
        isLoading: this.isLoading,
        error: this.error,
        fetchData: this.fetchData,
        refresh: this.refresh
      }
    }
  },
  methods: {
    getCommunityMembers,
    handleCall () {
      this.fetchData()
    },
    handleLinkClick () {
      this.hide()
    },
    fetchData (
      page
    ) {
      this.getCommunityMembers(
        {
          ...this.communityArgs,
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
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
