export const messages = {
  en: {
    layout: {
      navigation: {
        home: 'Home',
        artists: 'Artists',
        tags: 'Tags',
        artist: {
          images: 'Images',
          tracks: 'Tracks',
          albums: 'Albums',
          similar: 'Similar'
        },
        album: {},
        track: {
          similar: 'Similar'
        },
        tag: {
          artists: 'Artists',
          albums: 'Albums',
          tracks: 'Tracks'
        }
      },
      search: {
        input: {
          placeholder: 'Enter something...'
        },
        tabs: {
          artists: 'Artists',
          albums: 'Albums',
          tracks: 'Tracks'
        }
      },
      player: {
        variants: 'Variants ({number})'
      }
    },
    errors: {
      badRequest: {
        header: 'Bad request',
        content: 'Please make a request with valid data.'
      },
      notFound: {
        header: 'Nothing was found',
        content: 'Please try looking for something else.'
      },
      internalServer: {
        header: 'Internal server error',
        content: 'Please contact us for information.'
      },
      badGateway: {
        header: 'Remote server error',
        content: 'Please try again in a moment.'
      },
      gatewayTimeout: {
        header: 'Remote server timeout',
        content: 'Please try again in a moment.'
      },
      connection: {
        header: 'Connection lost',
        content: 'Please try again in a moment.'
      },
      client: {
        header: 'Client error',
        content: 'Please contact us for information.'
      }
    },
    settings: {
      headers: {
        player: 'Player',
        queue: 'Queue'
      },
      player: {
        audioSource: 'Audio source'
      },
      queue: {
        autoplay: 'Autoplay'
      }
    },
    pages: {
      artist: {
        segments: {
          tracks: 'Top tracks',
          albums: 'Top albums',
          similar: 'Similar'
        }
      },
      album: {
        sources: {
          select: {
            source: 'Select source:',
            type: 'Select type:',
            album: 'Select album:',
            group: 'Select album group:',
            track: 'Select single:'
          },
          streamable: 'Streamable',
          other: 'Other',
          types: {
            album: 'Album',
            group: 'Album group',
            track: 'Single'
          }
        }
      },
      track: {
        videos: {
          loading: 'Loading videos...',
          error: 'Error.',
          empty: 'No videos.'
        },
        lyrics: {
          loading: 'Loading lyrics...',
          error: 'Error.',
          empty: 'No lyrics.'
        }
      },
      tag: {
        segments: {
          artists: 'Top artists',
          albums: 'Top albums',
          tracks: 'Top tracks',
          similar: 'Similar:'
        }
      }
    },
    shared: {
      readMore: 'Read more...',
      listener: '{number} listener | {number} listeners',
      tracks: '{number} track | {number} tracks'
    },
    track: {
      source: {
        via: 'Via {source}'
      }
    },
    paginated: {
      noCollection: {
        header: 'No {collection}',
        subheader: 'Looks like there are no {collection}.'
      }
    }
  }
}
