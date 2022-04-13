<template>
  <BaseModalContainer ref="modal">
    <BaseSegmentContainer
      :class="[
        'scrolling content',
        'main-modal-content-full-height',
        'main-segment-container'
      ]"
      :is-loading="isLoading"
      @init="handleInit"
    >
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
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'
import getCommunityMembers from '*/helpers/actions/api/community/get'

export default {
  name: 'BaseCommunityMembersModal',
  components: {
    BaseModalContainer,
    BaseSegmentContainer,
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
      error: null,
      communityData: null,
      scrollable: null,
      isLoading: false,
      isOpen: false,
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
  watch: {
    isOpen: 'handleIsOpenChange'
  },
  methods: {
    handleInit (
      element
    ) {
      this.scrollable = element
    },
    handleIsOpenChange (
      value
    ) {
      if (value) {
        this.fetchData()
      }
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollable.scrollTo(
        0,
        0
      )
    },
    handleLinkClick () {
      this.$refs
        .modal
        .hide()
    },
    getCommunityMembers,
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

      this.isOpen = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
