<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="communityData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template
      #default="slotProps"
    >
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        @link-click="handleLinkClick"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import getCommunityMembers from '@/helpers/actions/api/community/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseCommunityMembersModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    modalMixin
  ],
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
    getData (
      {
        page
      } = {}
    ) {
      this.getCommunityMembers(
        {
          ...this.communityArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
