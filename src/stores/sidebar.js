import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithFeedItem: true,
      isWithConversationsItem: true,
      isWithLibraryItem: true,
      isWithRecommendationsItem: true,
      isWithSavedTracksItem: true,
      isWithPlaylistsItem: true,
      isWithFavoritesItem: true,
      isWithBookmarksItem: true,
      isWithTopItem: true,
      isWithReleasesItem: true,
      isWithRadioItem: true,
      isWithMultitagItem: true,
      isWithCommunitiesItem: true
    }
  },
  actions: {
    setIsWithFeedItem (
      value
    ) {
      this.isWithFeedItem = value
    },
    setIsWithConversationsItem (
      value
    ) {
      this.isWithConversationsItem = value
    },
    setIsWithLibraryItem (
      value
    ) {
      this.isWithLibraryItem = value
    },
    setIsWithRecommendationsItem (
      value
    ) {
      this.isWithRecommendationsItem = value
    },
    setIsWithSavedTracksItem (
      value
    ) {
      this.isWithSavedTracksItem = value
    },
    setIsWithPlaylistsItem (
      value
    ) {
      this.isWithPlaylistsItem = value
    },
    setIsWithFavoritesItem (
      value
    ) {
      this.isWithFavoritesItem = value
    },
    setIsWithBookmarksItem (
      value
    ) {
      this.isWithBookmarksItem = value
    },
    setIsWithTopItem (
      value
    ) {
      this.isWithTopItem = value
    },
    setIsWithReleasesItem (
      value
    ) {
      this.isWithReleasesItem = value
    },
    setIsWithRadioItem (
      value
    ) {
      this.isWithRadioItem = value
    },
    setIsWithMultitagItem (
      value
    ) {
      this.isWithMultitagItem = value
    },
    setIsWithCommunitiesItem (
      value
    ) {
      this.isWithCommunitiesItem = value
    }
  }
}

export default defineStore(
  'sidebar',
  data
)
