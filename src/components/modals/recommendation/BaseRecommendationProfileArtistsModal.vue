<template>
  <BaseModalContentContainer
    ref="modal"
    :response-data="recommendationData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <template #default>
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
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedListContainer>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import getRecommendation from '*/helpers/actions/api/recommendation/get'

export default {
  name: 'BaseRecommendationProfileArtistsModal',
  components: {
    BaseModalContentContainer,
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
      recommendationData: null,
      error: null,
      isLoading: false,
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
  methods: {
    getRecommendation,
    handleCall () {
      this.fetchData()
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollToTop()
    },
    handleLinkClick () {
      this.hide()
    },
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
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    scrollToTop () {
      this.$refs
        .modal
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
