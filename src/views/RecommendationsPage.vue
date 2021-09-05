<template>
  <BaseRecommendationsPageContainer>
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
      >
        <BasePaginatedContainer
          scope="recommendations"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.recommendationsData"
          :clientPageLimit="10"
          :responsePageLimit="10"
          @focus="handleFocus"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseArtistsExtendedList
              :artists="slotProps.recommendations"
              :profileId="profileId"
              isWithLibraryLink
              isWithListenedButton
              isWithBookmarkButton
              isRecommendation
            />
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseRecommendationsPageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseRecommendationsPageContainer
  from '@/containers/pages/recommendations/BaseRecommendationsPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsExtendedList
  from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'RecommendationsPage',
  components: {
    BaseRecommendationsPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer,
    BaseArtistsExtendedList
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
