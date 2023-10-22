import {
  mapState
} from 'pinia'
import recommendationArtistsStore from '@/stores/recommendationArtists'

export default {
  computed: {
    ...mapState(
      recommendationArtistsStore,
      {
        isRecommendationArtistsHideLibraryArtists:
          'isHideLibraryArtists',
        recommendationArtistsHideLibraryArtistsTracksCount:
          'hideLibraryArtistsTracksCount',
        isRecommendationArtistsHideListenedArtists:
          'isHideListenedArtists'
      }
    )
  },
  watch: {
    isRecommendationArtistsHideLibraryArtists:
      'handleIsRecommendationArtistsHideLibraryArtists',
    recommendationArtistsHideLibraryArtistsTracksCount:
      'handleRecommendationArtistsHideLibraryArtistsTracksCount',
    isRecommendationArtistsHideListenedArtists:
      'handleIsRecommendationArtistsHideListenedArtists'
  },
  methods: {
    handleIsRecommendationArtistsHideLibraryArtists () {
      this.refreshContent()
    },
    handleRecommendationArtistsHideLibraryArtistsTracksCount () {
      this.refreshContent()
    },
    handleIsRecommendationArtistsHideListenedArtists () {
      this.refreshContent()
    },
    refreshContent () {
      if (this.isRecommendationsPage) {
        this.$refs
          .page
          .refresh()
      } else if (this.isRecommendationsSegment) {
        this.$refs
          .segment
          .refresh()
      } else if (this.isRecommendationsTab) {
        this.$refs
          .tab
          .refresh()
      }
    }
  }
}
