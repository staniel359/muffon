<template>
  <BaseProfilePageContainer
    scope="communities"
    pageNameKey="communities"
    :profileId="profileId"
    :responsePageLimit="limit"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer
          class="top-segment"
        >
          <BaseLink
            :link="communitiesLink"
            :text="communitiesLinkText"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="main-paginated-page-segment-container"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedListContainer
            scope="communities"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.profileData"
            :clientPageLimit="limit"
            :responsePageLimit="limit"
            @focus="handleFocus"
            @fetchData="pageSlotProps.fetchData"
            @refresh="pageSlotProps.handleRefresh"
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
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '*/components/containers/pages/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import {
  main as formatCommunitiesLink
} from '*/helpers/formatters/links/communities'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfilePageContainer,
    BaseSegmentContainer,
    BaseLink,
    BasePaginatedListContainer,
    BaseCommunitiesSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    communitiesLink () {
      return formatCommunitiesLink()
    },
    communitiesLinkText () {
      return this.$t(
        'links.communities'
      )
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped>
.top-segment
  @extend .d-flex, .justify-content-flex-end
</style>
