<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      :profileId="profileId"
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
        :clientPageLimit="limit"
        :responsePageLimit="limit"
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
import HeaderSegment from './CommunitiesSegment/HeaderSegment.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import getProfileCommunities from '*/helpers/actions/api/profile/get'
import { focusOnSegment } from '*/helpers/actions/layout'

export default {
  name: 'CommunitiesSegment',
  components: {
    HeaderSegment,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseCommunitiesSimpleList
  },
  props: {
    profileId: String
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
    profileCommunitiesArgs () {
      return {
        profileId: this.profileId,
        scope: 'communities',
        limit: this.limit
      }
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
        ...this.profileCommunitiesArgs,
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
