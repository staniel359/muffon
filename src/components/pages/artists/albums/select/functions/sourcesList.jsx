export default function sourcesList () {
  return {
    lastfm: {
      name: 'Last.FM'
    },
    vk: {
      name: 'VK'
    },
    bandcamp: {
      name: 'Bandcamp',
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
      name: 'SoundCloud'
    },
    discogs: {
      name: 'Discogs',
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
    }
  }
}
