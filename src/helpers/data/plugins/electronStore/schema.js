export default {
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
  'layout.isSwitchToNewTab': {
    type: 'boolean',
    default: true
  },
  'layout.isWithInfiniteScroll': {
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
  'player.isWithBitrate': {
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
  'player.source': {
    type: 'string',
    default: 'vk'
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
  'recommendations.tracksCount': {
    type: 'number',
    default: 0
  },
  'search.source': {
    type: 'string',
    default: 'lastfm'
  }
}
