<template>
  <BaseModalContainer ref="modal">
    <BaseSegmentContainer
      ref="scrollable"
      :class="[
        'scrolling content',
        'main-modal-content-full-height',
        'main-segment-container'
      ]"
      :isLoading="isLoading"
      @init="handleInit"
    >
      <BasePaginatedListContainer
        v-if="communityData"
        scope="members"
        :isLoading="isLoading"
        :error="error"
        :responseData="communityData"
        :clientPageLimit="limit"
        :responsePageLimit="limit"
        @fetchData="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BaseProfilesSimpleList
            :profiles="slotProps.members"
            @linkClick="handleLinkClick"
          />
        </template>
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseProfilesSimpleList
  from '@/lists/profiles/BaseProfilesSimpleList.vue'
import getCommunityMembers from '#/actions/api/community/get'

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
      limit: 50
    }
  },
  computed: {
    communityArgs () {
      return {
        communityId: this.communityId,
        scope: 'members',
        limit: this.limit
      }
    }
  },
  watch: {
    isOpen: 'handleIsOpenChange'
  },
  methods: {
    handleInit (el) {
      this.scrollable = el
    },
    handleIsOpenChange (value) {
      if (value) {
        this.fetchData()
      }
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      this.scrollable.scrollTo(0, 0)
    },
    handleLinkClick () {
      this.$refs.modal.hide()
    },
    getCommunityMembers,
    fetchData (page) {
      this.getCommunityMembers({
        ...this.communityArgs,
        page
      })
    },
    show () {
      this.$refs.modal.show()

      this.isOpen = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
