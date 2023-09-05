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
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-created
        is-link-to-library
        is-with-library
        is-with-page-option
        is-with-source-option
        is-with-library-option
        is-with-playlist-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-queue-option
        is-with-save-option
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
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import getRecommendationTrack
  from '@/helpers/actions/api/recommendation/track/get'
import modalMixin from '@/mixins/modalMixin'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseRecommendationTrackTracksModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BaseTracksSimpleList
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
        tracksLimits.simple.large,
      scope: 'tracks'
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
        recommendationId:
          this.recommendationId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  methods: {
    getRecommendationTrack,
    getData (
      {
        page
      } = {}
    ) {
      this.getRecommendationTrack(
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
