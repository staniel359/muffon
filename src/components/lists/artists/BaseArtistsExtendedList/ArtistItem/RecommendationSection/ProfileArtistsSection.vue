<template>
  <BaseDivider />

  <BaseHeader
    tag="h4"
    :text="similarText"
  />

  <BasePaginatedListContainer
    class="profile-artists-list"
    :response-data="profileArtistsData"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        is-image-small
        is-link-to-library
      />
    </template>
  </BasePaginatedListContainer>

  <div
    v-if="isMore"
    class="more-container"
  >
    <strong
      class="main-link"
      @click="handleMoreClick"
      v-text="moreText"
    />

    <BaseRecommendationProfileArtistsModal
      ref="modal"
      :recommendation-id="recommendationId"
    />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseRecommendationProfileArtistsModal
  from '*/components/modals/recommendation/BaseRecommendationProfileArtistsModal.vue'

export default {
  name: 'ProfileArtistsSection',
  components: {
    BaseDivider,
    BaseHeader,
    BasePaginatedListContainer,
    BaseArtistsSimpleList,
    BaseRecommendationProfileArtistsModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  data () {
    return {
      limit: 5,
      scope: 'artists'
    }
  },
  computed: {
    similarText () {
      return this.$t(
        'recommendation.similar',
        {
          count: this.profileArtistsCount
        }
      )
    },
    profileArtistsCount () {
      return this.recommendationData.profile_artists_count
    },
    profileArtistsData () {
      return {
        page: 1,
        total_pages: 1,
        artists: this.profileArtists
      }
    },
    profileArtists () {
      return this.recommendationData.profile_artists
    },
    isMore () {
      return this.profileArtistsCount > 5
    },
    moreText () {
      return this.$t(
        'more'
      )
    },
    recommendationId () {
      return this.recommendationData.id.toString()
    }
  },
  methods: {
    handleMoreClick () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-artists-list
  margin-top: 0.5em

.more-container
  text-align: right
  margin-top: 0.5em
</style>
