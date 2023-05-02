<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="recommendationData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="topTracksCount"
        :top-albums-count="topAlbumsCount"
        is-link-to-library
        is-with-library
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
        @link-click="handleLinkClick"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import getRecommendation from '@/helpers/actions/api/recommendation/get'
import modalMixin from '@/mixins/modalMixin'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseRecommendationArtistsModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BaseArtistsSimpleList
  },
  mixins: [
    modalMixin
  ],
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
      limit:
        artistsLimits.simple.large,
      scope: 'artists'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    recommendationArgs () {
      return {
        recommendationId: this.recommendationId,
        scope: this.scope,
        limit: this.limit
      }
    },
    topTracksCount () {
      return this.recommendationData.top_tracks_count
    },
    topAlbumsCount () {
      return this.recommendationData.top_albums_count
    }
  },
  methods: {
    getRecommendation,
    getData (
      {
        page
      } = {}
    ) {
      this.getRecommendation(
        {
          ...this.recommendationArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
