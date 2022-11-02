export default [
  {
    id: 'lastfm',
    icon: 'lastfm',
    name: 'Last.FM',
    isStreamable: false,
    isWithAlbums: true,
    isWithTracks: true,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks',
      'tags'
    ]
  },
  {
    id: 'vk',
    icon: 'vk',
    name: 'VK',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 320,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'odnoklassniki',
    icon: 'odnoklassniki',
    name: 'Odnoklassniki',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 320,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'yandexmusic',
    icon: 'yandexmusic',
    name: 'Yandex Music',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 192,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'bandcamp',
    icon: 'bandcamp',
    name: 'Bandcamp',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 128,
    albumTypes: [
      'album',
      'track'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'deezer',
    icon: 'deezer',
    name: 'Deezer',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 128,
    albumTypes: [
      'album'
    ],
    albumsTypes: [
      'album',
      'single'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'soundcloud',
    icon: 'soundcloud',
    name: 'SoundCloud',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 128,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'spotify',
    icon: 'spotify',
    name: 'Spotify',
    isStreamable: true,
    isWithAlbums: true,
    isWithTracks: true,
    maxBitrate: 128,
    albumTypes: [
      'album'
    ],
    albumsTypes: [
      'album',
      'single',
      'compilation',
      'appearance'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'discogs',
    icon: 'discogs',
    name: 'Discogs',
    isStreamable: false,
    isWithAlbums: true,
    isWithTracks: false,
    albumTypes: [
      'group',
      'album'
    ],
    albumsTypes: [
      'album',
      'single_ep',
      'compilation',
      'video',
      'misc'
    ],
    searchScopes: [
      'artists',
      'albums',
      'albumGroups'
    ]
  },
  {
    id: 'genius',
    icon: 'genius',
    name: 'Genius',
    isStreamable: false,
    isWithAlbums: true,
    isWithTracks: true,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks'
    ]
  },
  {
    id: 'youtube',
    icon: 'youtube',
    name: 'YouTube',
    isStreamable: false,
    isWithAlbums: false,
    isWithTracks: false,
    searchScopes: [
      'videos'
    ]
  }
]
