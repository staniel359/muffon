export default function sourcesList () {
  return {
    lastfm: {
      name: 'Last.FM',
      streamable: false
    },
    vk: {
      name: 'VK',
      streamable: true,
      maxBitrate: 320
    },
    yandexMusic: {
      name: 'Yandex Music',
      streamable: true,
      maxBitrate: 192
    },
    bandcamp: {
      name: 'Bandcamp',
      streamable: true,
      maxBitrate: 128,
      onlyTitle: true,
      types: {
        albums: {
          name: 'Album',
          single: 'album'
        },
        tracks: {
          name: 'Single',
          single: 'album'
        }
      }
    },
    soundcloud: {
      name: 'SoundCloud',
      streamable: true,
      maxBitrate: 128
    },
    discogs: {
      name: 'Discogs',
      streamable: false,
      onlyTitle: true,
      types: {
        groups: {
          name: 'Album group',
          single: 'group'
        },
        albums: {
          name: 'Album',
          single: 'album'
        }
      }
    },
    spotify: {
      name: 'Spotify',
      streamable: false
    },
    deezer: {
      name: 'Deezer',
      streamable: true,
      maxBitrate: 128
    }
  }
}
