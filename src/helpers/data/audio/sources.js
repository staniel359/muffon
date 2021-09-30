export default [
  {
    id: 'vk',
    icon: 'vk',
    name: 'VK',
    isStreamable: true,
    isWithAlbums: true,
    maxBitrate: 320,
    albumTypes: [
      'album'
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
    ]
  },
  {
    id: 'spotify',
    icon: 'spotify',
    name: 'Spotify',
    isStreamable: true,
    isWithAlbums: true,
    isWithTracks: true,
    maxBitrate: 160,
    albumTypes: [
      'album'
    ],
    albumsTypes: [
      'album',
      'single',
      'compilation',
      'appearance'
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
    ]
  },
  {
    id: 'lastfm',
    icon: 'lastfm',
    name: 'Last.FM',
    isStreamable: false,
    isWithAlbums: true,
    isWithTracks: true,
    albumTypes: [
      'album'
    ]
  },
  {
    id: 'rateyourmusic',
    icon: 'rateyourmusic',
    name: 'Rate Your Music',
    isStreamable: false,
    isWithAlbums: true,
    isWithTracks: false,
    albumTypes: [
      'album',
      'albumVarious'
    ],
    albumsTypes: [
      'album',
      'ep',
      'single',
      'live',
      'compilation',
      'appearance',
      'unofficial',
      'various',
      'video'
    ]
  },
  {
    id: 'youtube',
    icon: 'youtube',
    name: 'YouTube',
    isWithAlbums: false
  }
]
