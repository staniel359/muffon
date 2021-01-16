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
      onlyTitle: true
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
