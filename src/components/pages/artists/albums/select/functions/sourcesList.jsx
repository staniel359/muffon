export default function sourcesList () {
  return {
    lastfm: {
      name: 'Last.FM',
      streamable: false
    },
    vk: {
      name: 'VK',
      streamable: true
    },
    bandcamp: {
      name: 'Bandcamp',
      streamable: true,
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
      streamable: true
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
    deezer: {
      name: 'Deezer',
      streamable: true
    }
  }
}
