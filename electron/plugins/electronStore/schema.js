export default {
  'audio.volume': {
    type: 'number',
    default: 1
  },
  'audio.isEqualizerEnabled': {
    type: 'boolean',
    default: false
  },
  'audio.isLoop': {
    type: 'boolean',
    default: false
  },
  'audio.isMuted': {
    type: 'boolean',
    default: false
  },
  'audio.equalizers': {
    type: 'array',
    default: [
      {
        key: 'lowshelf-30',
        type: 'lowshelf',
        frequency: 30,
        gain: 0
      },
      {
        key: 'peaking-60',
        type: 'peaking',
        frequency: 60,
        gain: 0
      },
      {
        key: 'peaking-125',
        type: 'peaking',
        frequency: 125,
        gain: 0
      },
      {
        key: 'peaking-250',
        type: 'peaking',
        frequency: 250,
        gain: 0
      },
      {
        key: 'peaking-500',
        type: 'peaking',
        frequency: 500,
        gain: 0
      },
      {
        key: 'peaking-1000',
        type: 'peaking',
        frequency: 1000,
        gain: 0
      },
      {
        key: 'peaking-2000',
        type: 'peaking',
        frequency: 2000,
        gain: 0
      },
      {
        key: 'peaking-4000',
        type: 'peaking',
        frequency: 4000,
        gain: 0
      },
      {
        key: 'peaking-8000',
        type: 'peaking',
        frequency: 8000,
        gain: 0
      },
      {
        key: 'highshelf-16000',
        type: 'highshelf',
        frequency: 16000,
        gain: 0
      }
    ]
  },
  'discord.richPresenceButtons': {
    type: 'array',
    default: [
      '',
      ''
    ]
  },
  'layout.activeTabId': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'layout.backgroundImageId': {
    anyOf: [
      {
        type: 'number',
        default: 0
      },
      {
        type: [
          'null',
          'string'
        ],
        default: null
      }
    ]
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
  'layout.isCloseTabsOnQuit': {
    type: 'boolean',
    default: false
  },
  'layout.isDarkMode': {
    type: 'boolean',
    default: false
  },
  'layout.isShowDonateModal': {
    type: 'boolean',
    default: true
  },
  'layout.isShowDonateModalLater': {
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
  'layout.isWithInnerCounters': {
    type: 'boolean',
    default: true
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
  'layout.isRtl': {
    type: 'boolean',
    default: false
  },
  'lyrics.isWithAnnotations': {
    type: 'boolean',
    default: true
  },
  'history.librarySearch': {
    type: 'array',
    default: []
  },
  'history.savedTracksSearch': {
    type: 'array',
    default: []
  },
  'history.search': {
    type: 'array',
    default: []
  },
  'history.player': {
    type: 'array',
    default: []
  },
  'history.browser': {
    type: 'array',
    default: []
  },
  'homePage.isWithRecentTracksSegment': {
    type: 'boolean',
    default: true
  },
  'homePage.isWithRecommendationArtistsSegment': {
    type: 'boolean',
    default: true
  },
  'homePage.isWithRecommendationTracksSegment': {
    type: 'boolean',
    default: true
  },
  'homePage.isWithTopArtistsSegment': {
    type: 'boolean',
    default: true
  },
  'homePage.isWithTopAlbumsSegment': {
    type: 'boolean',
    default: true
  },
  'homePage.isWithTopTracksSegment': {
    type: 'boolean',
    default: true
  },
  'homePage.isWithNewReleasesSegment': {
    type: 'boolean',
    default: true
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
  'player.isWithEqualizer': {
    type: 'boolean',
    default: true
  },
  'player.isWithPlayingFocus': {
    type: 'boolean',
    default: true
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
  'player.isPauseOnVideoPlay': {
    type: 'boolean',
    default: true
  },
  'profile.connections': {
    type: 'object',
    default: {}
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
  'queue.isLoop': {
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
  'recommendationArtists.isHideLibraryArtists': {
    type: 'boolean',
    default: false
  },
  'recommendationArtists.hideLibraryArtistsTracksCount': {
    type: 'number',
    default: 0
  },
  'recommendationArtists.isHideListenedArtists': {
    type: 'boolean',
    default: false
  },
  'recommendationTracks.isHideLibraryTracks': {
    type: 'boolean',
    default: false
  },
  'recommendationTracks.isHideLibraryArtists': {
    type: 'boolean',
    default: false
  },
  'recommendationTracks.hideLibraryArtistsTracksCount': {
    type: 'number',
    default: 0
  },
  'recommendationTracks.isHideListenedTracks': {
    type: 'boolean',
    default: false
  },
  'recommendationTracks.isHideListenedArtists': {
    type: 'boolean',
    default: false
  },
  'search.source': {
    type: 'string',
    default: 'lastfm'
  },
  'search.scope': {
    type: 'string',
    default: 'artists'
  },
  'search.isResultsFullSize': {
    type: 'boolean',
    default: false
  },
  'sidebar.isWithHomePageItem': {
    type: 'boolean',
    default: true
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
  'sidebar.isWithHistoryItem': {
    type: 'boolean',
    default: true
  },
  'system.isWithCache': {
    type: 'boolean',
    default: true
  },
  'system.isAutoupdateAvailable': {
    type: [
      'null',
      'boolean'
    ],
    default: null
  },
  'system.isWithAutoupdate': {
    type: [
      'null',
      'boolean'
    ],
    default: null
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
  },
  'video.isPauseOnAudioPlay': {
    type: 'boolean',
    default: true
  },
  'video.isOpenLinksInNewTab': {
    type: 'boolean',
    default: false
  },
  'window.isQuitOnClose': {
    type: 'boolean',
    default: false
  },
  'window.isMaximizeOnStart': {
    type: 'boolean',
    default: false
  },
  'window.isWithTrayIcon': {
    type: 'boolean',
    default: true
  }
}
