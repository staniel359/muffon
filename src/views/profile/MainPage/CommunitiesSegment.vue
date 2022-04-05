<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <BaseHeaderSegment
      scope="communities"
      :link="headerLink"
    />

    <BaseSegmentContainer
      class="communities-segment"
      :isLoading="isLoading"
    >
      <BasePaginatedListContainer
        scope="communities"
        :isLoading="isLoading"
        :error="error"
        :responseData="profileData"
        :limit="limit"
        @focus="handleFocus"
        @fetchData="fetchData"
        @refresh="handleRefresh"
      >
        <template #default="slotProps">
          <BaseCommunitiesSimpleList
            :communities="slotProps.communities"
          />
        </template>
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import getProfileCommunities from '*/helpers/actions/api/profile/get'
import { focusOnSegment } from '*/helpers/actions/layout'
import {
  communities as formatProfileCommunitiesLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'CommunitiesSegment',
  components: {
    BaseHeaderSegment,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseCommunitiesSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false,
      limit: 5
    }
  },
  computed: {
    communitiesArgs () {
      return {
        profileId: this.profileId,
        scope: 'communities',
        limit: this.limit
      }
    },
    headerLink () {
      return formatProfileCommunitiesLink({
        profileId: this.profileId
      })
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      focusOnSegment(
        this.$refs.segment
      )
    },
    getProfileCommunities,
    fetchData (page) {
      this.getProfileCommunities({
        ...this.communitiesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.communities-segment
  @extend .d-flex
</style>
