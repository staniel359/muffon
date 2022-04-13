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
        :response-data="recommendationData"
        :scope="scope"
        :limit="limit"
        :is-loading="isLoading"
        :error="error"
        @fetch-data="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BaseArtistsSimpleList
            :artists="slotProps[scope]"
            :profile-id="profileId"
            is-link-to-library
            is-image-small
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import getRecommendation from '*/helpers/actions/api/recommendation/get'

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
    }
  },
  data () {
    return {
      error: null,
      recommendationData: null,
      scrollable: null,
      isLoading: false,
      isOpen: false,
      limit: 50,
      scope: 'profile_artists'
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo.id.toString()
    },
    recommendationArgs () {
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
    getRecommendation,
    fetchData (
      page
    ) {
      this.getRecommendation(
        {
          ...this.recommendationArgs,
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
