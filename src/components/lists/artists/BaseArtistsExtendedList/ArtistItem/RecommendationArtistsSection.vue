<template>
  <BaseDivider />

  <BaseHeader
    tag="h4"
    :text="similarText"
  />

  <BaseArtistsSimpleList
    class="artists-list"
    :artists="artists"
    :profile-id="profileId"
    :is-paginated="false"
    is-image-small
    is-link-to-library
    is-with-page-option
    is-with-share-option
  />

  <div
    class="more-container"
  >
    <strong
      class="main-link"
      @click="handleMoreClick"
      v-text="moreText"
    />

    <BaseRecommendationArtistsModal
      ref="modal"
      :recommendation-id="recommendationId"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseRecommendationArtistsModal
  from '@/components/modals/recommendation/BaseRecommendationArtistsModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'RecommendationArtistsSection',
  components: {
    BaseDivider,
    BaseHeader,
    BaseArtistsSimpleList,
    BaseRecommendationArtistsModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      limit: 5,
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
    similarText () {
      return this.$t(
        'recommendation.similar',
        {
          counter: this.counterText
        }
      )
    },
    counterText () {
      return this.$tc(
        'counters.genitive.artists',
        this.artistsCount,
        {
          count: this.artistsCountFormatted
        }
      )
    },
    artistsCountFormatted () {
      return formatNumber(
        this.artistsCount
      )
    },
    artistsCount () {
      return this.recommendationData.artists_count
    },
    artists () {
      return this.recommendationData.artists
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
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.artists-list
  margin: 0.5em 0

.more-container
  @extend .text-align-right
</style>
