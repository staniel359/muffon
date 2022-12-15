export default {
  namespaced: true,
  state: {
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
  },
  mutations: {
    SET_IS_WITH_FEED_ITEM (
      state,
      value
    ) {
      state.isWithFeedItem = value
    },
    SET_IS_WITH_CONVERSATIONS_ITEM (
      state,
      value
    ) {
      state.isWithConversationsItem = value
    },
    SET_IS_WITH_LIBRARY_ITEM (
      state,
      value
    ) {
      state.isWithLibraryItem = value
    },
    SET_IS_WITH_RECOMMENDATIONS_ITEM (
      state,
      value
    ) {
      state.isWithRecommendationsItem = value
    },
    SET_IS_WITH_SAVED_TRACKS_ITEM (
      state,
      value
    ) {
      state.isWithSavedTracksItem = value
    },
    SET_IS_WITH_PLAYLISTS_ITEM (
      state,
      value
    ) {
      state.isWithPlaylistsItem = value
    },
    SET_IS_WITH_FAVORITES_ITEM (
      state,
      value
    ) {
      state.isWithFavoritesItem = value
    },
    SET_IS_WITH_BOOKMARKS_ITEM (
      state,
      value
    ) {
      state.isWithBookmarksItem = value
    },
    SET_IS_WITH_TOP_ITEM (
      state,
      value
    ) {
      state.isWithTopItem = value
    },
    SET_IS_WITH_RELEASES_ITEM (
      state,
      value
    ) {
      state.isWithReleasesItem = value
    },
    SET_IS_WITH_RADIO_ITEM (
      state,
      value
    ) {
      state.isWithRadioItem = value
    },
    SET_IS_WITH_MULTITAG_ITEM (
      state,
      value
    ) {
      state.isWithMultitagItem = value
    },
    SET_IS_WITH_COMMUNITIES_ITEM (
      state,
      value
    ) {
      state.isWithCommunitiesItem = value
    }
  },
  actions: {
    setIsWithFeedItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_FEED_ITEM',
        value
      )
    },
    setIsWithConversationsItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_CONVERSATIONS_ITEM',
        value
      )
    },
    setIsWithLibraryItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_LIBRARY_ITEM',
        value
      )
    },
    setIsWithRecommendationsItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_RECOMMENDATIONS_ITEM',
        value
      )
    },
    setIsWithSavedTracksItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_SAVED_TRACKS_ITEM',
        value
      )
    },
    setIsWithPlaylistsItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_PLAYLISTS_ITEM',
        value
      )
    },
    setIsWithFavoritesItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_FAVORITES_ITEM',
        value
      )
    },
    setIsWithBookmarksItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_BOOKMARKS_ITEM',
        value
      )
    },
    setIsWithTopItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_TOP_ITEM',
        value
      )
    },
    setIsWithReleasesItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_RELEASES_ITEM',
        value
      )
    },
    setIsWithRadioItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_RADIO_ITEM',
        value
      )
    },
    setIsWithMultitagItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_MULTITAG_ITEM',
        value
      )
    },
    setIsWithCommunitiesItem (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_COMMUNITIES_ITEM',
        value
      )
    }
  }
}
