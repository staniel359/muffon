<template>
  <BaseModalContentContainer
    ref="modal"
    :response-data="communityData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <template #default>
      <BasePaginatedListContainer
        :response-data="communityData"
        :scope="scope"
        :limit="limit"
        :is-loading="isLoading"
        :error="error"
        @fetch-data="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BaseProfilesSimpleList
            :profiles="slotProps[scope]"
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedListContainer>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'
import getCommunityMembers from '*/helpers/actions/api/community/get'

export default {
  name: 'BaseCommunityMembersModal',
  components: {
    BaseModalContentContainer,
    BasePaginatedListContainer,
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
    }
  },
  methods: {
    getCommunityMembers,
    handleCall () {
      this.fetchData()
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollToTop()
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
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    scrollToTop () {
      this.$refs
        .modal
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
