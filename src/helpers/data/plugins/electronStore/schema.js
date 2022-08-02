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
  'layout.backgroundImages': {
    type: 'array',
    default: []
  },
  'layout.backgroundImageId': {
    type: 'number',
    default: 0
  },
  'layout.backgroundImagePath': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'layout.isExitOnClose': {
    type: 'boolean',
    default: false
  },
  'layout.isDarkMode': {
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
  'history.search': {
    type: 'array',
    default: []
  },
  'history.librarySearch': {
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
  'player.scrobblePercent': {
    type: 'number',
    default: 50
  },
  'player.playing': {
    type: [
      'null',
      'object'
    ],
    default: null
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
  'profile.token': {
    type: [
      'null',
      'string'
    ],
    default: null
  },
  'profile.savedTracks': {
    type: 'array',
    default: []
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
