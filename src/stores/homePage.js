import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithRecentTracksSegment: null,
      isWithRecommendationArtistsSegment: null,
      isWithRecommendationTracksSegment: null,
      isWithTopArtistsSegment: null,
      isWithTopAlbumsSegment: null,
      isWithTopTracksSegment: null,
      isWithNewReleasesSegment: null
    }
  },
  actions: {
    setIsWithRecentTracksSegment (
      value
    ) {
      this.isWithRecentTracksSegment = value
    },
    setIsWithRecommendationArtistsSegment (
      value
    ) {
      this.isWithRecommendationArtistsSegment = value
    },
    setIsWithRecommendationTracksSegment (
      value
    ) {
      this.isWithRecommendationTracksSegment = value
    },
    setIsWithTopArtistsSegment (
      value
    ) {
      this.isWithTopArtistsSegment = value
    },
    setIsWithTopAlbumsSegment (
      value
    ) {
      this.isWithTopAlbumsSegment = value
    },
    setIsWithTopTracksSegment (
      value
    ) {
      this.isWithTopTracksSegment = value
    },
    setIsWithNewReleasesSegment (
      value
    ) {
      this.isWithNewReleasesSegment = value
    }
  }
}

export default defineStore(
  'homePage',
  data
)
