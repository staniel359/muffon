export default [
  {
    id: 'lastfm',
    icon: 'lastfm',
    name: 'Last.FM',
    isWithArtists: true,
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
    isAudio: true,
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
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
    isAudio: true,
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
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
    isAudio: true,
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
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
    id: 'amazonmusic',
    icon: 'amazonmusic',
    name: 'Amazon Music',
    isAudio: true,
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
    maxBitrate: 160,
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
    isAudio: true,
    isWithArtists: true,
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
    isAudio: true,
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
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
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
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
    isAudio: true,
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
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
    id: 'discogs',
    icon: 'discogs',
    name: 'Discogs',
    isWithArtists: true,
    isWithAlbums: true,
    albumTypes: [
      'group',
      'album'
    ],
    // albumsTypes: [
    //   'album',
    //   'singleEp',
    //   'compilation',
    //   'misc'
    // ],
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
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
    isWithLyrics: true,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'albums',
      'tracks',
      'lyrics'
    ]
  },
  {
    id: 'musixmatch',
    icon: 'musixmatch',
    name: 'MusixMatch',
    isWithArtists: true,
    isWithTracks: true,
    isWithLyrics: true,
    albumTypes: [
      'album'
    ],
    searchScopes: [
      'artists',
      'tracks',
      'lyrics'
    ]
  },
  {
    id: 'musicbrainz',
    icon: 'musicbrainz',
    name: 'MusicBrainz',
    isWithArtists: true,
    isWithAlbums: true,
    isWithTracks: true,
    albumTypes: [
      'group',
      'album'
    ],
    albumsTypes: [
      'album',
      'single',
      'ep',
      'compilation',
      'live',
      'misc'
    ],
    searchScopes: [
      'artists',
      'albums',
      'albumGroups',
      'tracks'
    ]
  },
  {
    id: 'youtubemusic',
    icon: 'youtubemusic',
    name: 'YouTube Music',
    isVideo: true,
    videoTypes: [
      'track',
      'video'
    ],
    searchScopes: [
      'tracks',
      'videos',
      'videoMixes',
      'videoPlaylists'
    ]
  },
  {
    id: 'youtube',
    icon: 'youtube',
    name: 'YouTube',
    isVideo: true,
    videoTypes: [
      'video'
    ],
    searchScopes: [
      'videos',
      'videoChannels',
      'videoPlaylists'
    ]
  }
]
