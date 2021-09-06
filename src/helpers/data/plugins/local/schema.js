export default {
  'layout.activeTabId': {
    type: ['null', 'string'],
    default: null
  },
  'layout.isDarkMode': {
    type: 'boolean',
    default: false
  },
  'layout.tabs': {
    type: 'array',
    default: []
  },
  'history.search': {
    type: 'array',
    default: []
  },
  'player.currentTrackId': {
    type: ['null', 'string'],
    default: null
  },
  'player.currentVariantId': {
    type: ['null', 'string'],
    default: null
  },
  'player.playing': {
    type: ['null', 'object'],
    default: null
  },
  'player.sourceId': {
    type: 'string',
    default: 'vk'
  },
  'player.variants': {
    type: 'array',
    default: []
  },
  'profile.info': {
    type: ['null', 'object'],
    default: null
  },
  'profile.isLoggedIn': {
    type: 'boolean',
    default: false
  },
  'profile.isRemember': {
    type: 'boolean',
    default: false
  },
  'profile.language': {
    type: 'string',
    default: 'en'
  },
  'profile.token': {
    type: ['null', 'string'],
    default: null
  },
  'queue.currentTrackId': {
    type: ['null', 'string'],
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
  }
}
