<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    response-data-name="recommendationData"
    :slot-props-data="slotPropsData"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
        @link-click="handleLinkClick"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BasePaginatedSegmentModalContainer
  from '*/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import getRecommendation from '*/helpers/actions/api/recommendation/get'

export default {
  name: 'BaseRecommendationProfileArtistsModal',
  components: {
    BasePaginatedSegmentModalContainer,
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
    },
    slotPropsData () {
      return {
        recommendationData: this.recommendationData,
        isLoading: this.isLoading,
        error: this.error,
        fetchData: this.fetchData,
        refresh: this.refresh
      }
    }
  },
  methods: {
    getRecommendation,
    handleCall () {
      this.fetchData()
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
    refresh (
      page
    ) {
      this.fetchData(
        page
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
