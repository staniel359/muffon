const schema = {
  'audio.volume': {
    type: 'number',
    default: 1
  },
  'layout.activeTabId': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'layout.backgroundImageId': {
    type: 'number',
    default: 0
  },
  'layout.backgroundImages': {
    type: 'array',
    default: []
  },
  'layout.backgroundImagePath': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'layout.isCachePages': {
    type: 'boolean',
    default: true
  },
  'layout.isCloseTabsOnExit': {
    type: 'boolean',
    default: false
  },
  'layout.isDarkMode': {
    type: 'boolean',
    default: false
  },
  'layout.isExitOnClose': {
    type: 'boolean',
    default: false
  },
  'layout.isMaximizeOnStart': {
    type: 'boolean',
    default: false
  },
  'layout.isShowDonateModal': {
    type: 'boolean',
    default: true
  },
  'layout.isSwitchToNewTab': {
    type: 'boolean',
    default: true
  },
  'layout.isWithArtistPopup': {
    type: 'boolean',
    default: true
  },
  'layout.isWithInfiniteScroll': {
    type: 'boolean',
    default: false
  },
  'layout.isWithSystemTheme': {
    type: 'boolean',
    default: false
  },
  'layout.tabs': {
    type: 'array',
    default: []
  },
  'layout.transparency': {
    type: 'number',
    default: 0
  },
  'layout.scale': {
    type: 'number',
    default: 1
  },
  'lyrics.isWithAnnotations': {
    type: 'boolean',
    default: true
  },
  'history.librarySearch': {
    type: 'array',
    default: []
  },
  'history.search': {
    type: 'array',
    default: []
  },
  'player.currentTrackId': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'player.currentVariantId': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'player.audioSources': {
    type: 'array',
    default: [
      'vk'
    ]
  },
  'player.isWithAlbum': {
    type: 'boolean',
    default: false
  },
  'player.isWithBitrate': {
    type: 'boolean',
    default: false
  },
  'player.isWithDiscordRichPresence': {
    type: 'boolean',
    default: false
  },
  'player.isWithScrobbleNotifications': {
    type: 'boolean',
    default: false
  },
  'player.isWithScrobbling': {
    type: 'boolean',
    default: false
  },
  'player.playing': {
    type: [
      'null',
      'object'
    ],
    default: null
  },
  'player.scrobblePercent': {
    type: 'number',
    default: 50
  },
  'player.variants': {
    type: 'array',
    default: []
  },
  'profile.info': {
    type: [
      'null',
      'object'
    ],
    default: null
  },
  'profile.isAnonymous': {
    type: 'boolean',
    default: false
  },
  'profile.isRemember': {
    type: 'boolean',
    default: false
  },
  'profile.isShowPlaying': {
    type: 'boolean',
    default: false
  },
  'profile.language': {
    type: 'string',
    default: 'en'
  },
  'profile.savedTracks': {
    type: 'array',
    default: []
  },
  'profile.timezone': {
    type: 'string',
    default: 'UTC'
  },
  'profile.token': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'queue.currentTrackId': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'queue.isAutoplay': {
    type: 'boolean',
    default: true
  },
  'queue.isClearOnPlayerClose': {
    type: 'boolean',
    default: false
  },
  'queue.isShuffle': {
    type: 'boolean',
    default: true
  },
  'queue.tracks': {
    type: 'array',
    default: []
  },
  'queue.tracksShuffled': {
    type: 'array',
    default: []
  },
  'recommendations.isHideLibraryArtists': {
    type: 'boolean',
    default: false
  },
  'recommendations.isHideListenedArtists': {
    type: 'boolean',
    default: false
  },
  'recommendations.tracksCount': {
    type: 'number',
    default: 0
  },
  'search.source': {
    type: 'string',
    default: 'lastfm'
  },
  'sidebar.isWithFeedItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithConversationsItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithLibraryItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithRecommendationsItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithSavedTracksItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithPlaylistsItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithFavoritesItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithBookmarksItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithTopItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithReleasesItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithRadioItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithMultitagItem': {
    type: 'boolean',
    default: true
  },
  'sidebar.isWithCommunitiesItem': {
    type: 'boolean',
    default: true
  },
  'top.country': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'video.isAutoplay': {
    type: 'boolean',
    default: false
  }
}

module.exports = schema
