<template>
  <BaseDivider />

  <BaseHeader
    tag="h4"
    :text="similarText"
  />

  <BaseArtistsSimpleList
    class="profile-artists-list"
    :artists="profileArtists"
    :profile-id="profileId"
    is-image-small
    is-link-to-library
  />

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
import {
  mapState
} from 'vuex'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseRecommendationProfileArtistsModal
  from '*/components/modals/recommendation/BaseRecommendationProfileArtistsModal.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'ProfileArtistsSection',
  components: {
    BaseDivider,
    BaseHeader,
    BaseArtistsSimpleList,
    BaseRecommendationProfileArtistsModal
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
      'profile',
      {
        profileInfo: 'info'
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
        this.profileArtistsCount,
        {
          count: this.profileArtistsCountFormatted
        }
      )
    },
    profileArtistsCountFormatted () {
      return formatNumber(
        this.profileArtistsCount
      )
    },
    profileArtistsCount () {
      return this.recommendationData.profile_artists_count
    },
    profileArtists () {
      return this.recommendationData.profile_artists
    },
    profileId () {
      return this.profileInfo.id.toString()
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
.profile-artists-list
  margin-top: 0.5em

.more-container
  text-align: right
  margin-top: 0.5em
</style>
