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
    is-with-external-link-option
  />

  <BaseMoreButton
    @click="handleMoreButtonClick"
  />

  <BaseRecommendationArtistsModal
    ref="modal"
    :recommendation-id="recommendationId"
  />
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
import BaseMoreButton from '@/components/buttons/BaseMoreButton.vue'
import BaseRecommendationArtistsModal
  from '@/components/modals/recommendation/BaseRecommendationArtistsModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'RecommendationArtistsSection',
  components: {
    BaseDivider,
    BaseHeader,
    BaseArtistsSimpleList,
    BaseMoreButton,
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
      limit:
        artistsLimits.simple.extrasmall,
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
    recommendationId () {
      return this.recommendationData.id.toString()
    }
  },
  methods: {
    handleMoreButtonClick () {
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
</style>
