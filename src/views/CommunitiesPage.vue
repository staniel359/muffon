<template>
  <BaseCommunitiesPageContainer
    ref="page"
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
          v-if="profileId"
        >
          <BaseCommunityCreateButton />
        </BaseSegmentContainer>

        <BasePaginatedSegmentContainer
          ref="pagination"
          class="main-paginated-page-segment-container"
          :response-data="pageSlotProps.communitiesData"
          :is-loading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :scope="scope"
          :limit="limit"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <BaseCommunitiesSimpleList
              :communities="slotProps[scope]"
              is-with-join-option
              is-with-share-option
            />
          </template>
        </BasePaginatedSegmentContainer>
      </div>
    </template>
  </BaseCommunitiesPageContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseCommunitiesPageContainer
  from '*/components/containers/pages/communities/BaseCommunitiesPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseCommunityCreateButton
  from '*/components/buttons/community/BaseCommunityCreateButton.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'CommunitiesPage',
  components: {
    BaseCommunitiesPageContainer,
    BaseSegmentContainer,
    BaseCommunityCreateButton,
    BasePaginatedSegmentContainer,
    BaseCommunitiesSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'communities'
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
