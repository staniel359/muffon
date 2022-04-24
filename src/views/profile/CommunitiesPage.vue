<template>
  <BaseProfilePageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
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

        <BasePaginatedSegmentContainer
          ref="pagination"
          class="main-paginated-page-segment-container"
          response-data-name="profileData"
          :slot-props-data="pageSlotProps"
          :scope="scope"
          :limit="limit"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <BaseCommunitiesSimpleList
              :communities="slotProps[scope]"
            />
          </template>
        </BasePaginatedSegmentContainer>
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
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import {
  communities as formatCommunitiesLink
} from '*/helpers/formatters/links'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'CommunitiesPage',
  components: {
    BaseProfilePageContainer,
    BaseSegmentContainer,
    BaseLink,
    BasePaginatedSegmentContainer,
    BaseCommunitiesSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'communities'
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
  }
}
</script>

<style lang="sass" scoped>
.top-segment
  @extend .d-flex, .justify-content-flex-end
</style>
