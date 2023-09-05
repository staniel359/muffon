import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithHomePageItem: null,
      isWithFeedItem: null,
      isWithConversationsItem: null,
      isWithLibraryItem: null,
      isWithRecommendationsItem: null,
      isWithSavedTracksItem: null,
      isWithPlaylistsItem: null,
      isWithFavoritesItem: null,
      isWithBookmarksItem: null,
      isWithTopItem: null,
      isWithReleasesItem: null,
      isWithRadioItem: null,
      isWithMultitagItem: null,
      isWithCommunitiesItem: null,
      isWithHistoryItem: null
    }
  },
  actions: {
    setIsWithHomePageItem (
      value
    ) {
      this.isWithHomePageItem = value
    },
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
    },
    setIsWithHistoryItem (
      value
    ) {
      this.isWithHistoryItem = value
    }
  }
}

export default defineStore(
  'sidebar',
  data
)
