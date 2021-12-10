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
      :error="error"
      @init="handleInit"
    >
      <BasePaginatedListContainer
        v-if="recommendationData"
        scope="profile_artists"
        :isLoading="isLoading"
        :error="error"
        :responseData="recommendationData"
        :clientPageLimit="limit"
        :responsePageLimit="limit"
        @fetchData="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BaseArtistsSimpleList
            :artists="slotProps.profile_artists"
            :profileId="profileId"
            isLinkToLibrary
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
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import fetchRecommendationData from '#/actions/api/recommendation/fetchData'

export default {
  name: 'BaseRecommendationProfileArtistsModal',
  components: {
    BaseModalContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseArtistsSimpleList
  },
  props: {
    recommendationId: {
      type: String,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      recommendationData: null,
      scrollable: null,
      isLoading: false,
      isOpen: false,
      limit: 50
    }
  },
  computed: {
    recommendationDataArgs () {
      return {
        recommendationId: this.recommendationId,
        scope: 'artists',
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
    fetchRecommendationData,
    fetchData (page) {
      this.fetchRecommendationData({
        ...this.recommendationDataArgs,
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
