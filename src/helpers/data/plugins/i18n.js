export const messages = {
  en: {
    layout: {
      navigation: {
        start: 'Start',
        artists: 'Artists',
        tags: 'Tags',
        videos: 'Video',
        artist: {
          images: 'Images',
          tracks: 'Tracks',
          albums: 'Albums',
          similar: 'Similar'
        },
        track: {
          similar: 'Similar'
        },
        tag: {
          artists: 'Artists',
          albums: 'Albums',
          tracks: 'Tracks'
        },
        video: {
          channel: {
            videos: 'Videos'
          }
        }
      },
      search: {
        input: {
          placeholder: 'Enter something...'
        },
        tabs: {
          artists: 'Artists',
          albums: 'Albums',
          tracks: 'Tracks',
          tags: 'Tags'
        }
      },
      player: {
        variants: 'Variants ({number})'
      },
      sidebar: {
        settings: 'Settings',
        logout: 'Log out'
      },
      settings: {
        tabs: {
          app: 'App',
          profile: 'Profile'
        },
        headers: {
          app: {
            view: 'View',
            player: 'Player',
            queue: 'Queue'
          },
          profile: {
            info: 'info'
          }
        },
        options: {
          view: {
            darkMode: 'Dark mode'
          },
          player: {
            audioSource: 'Audio source'
          },
          queue: {
            autoplay: 'Autoplay'
          }
        }
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
    pages: {
      start: {
        keys: {
          search: 'Search',
          openInTab: 'Open link in new tab',
          closeTab: 'Close tab'
        }
      },
      artist: {
        segments: {
          tracks: 'Top tracks',
          albums: 'Top albums',
          similar: 'Similar'
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
        },
        segments: {
          similar: 'Similar'
        }
      },
      tag: {
        segments: {
          similar: 'Similar:',
          artists: 'Top artists',
          albums: 'Top albums',
          tracks: 'Top tracks'
        }
      }
    },
    shared: {
      more: 'More...',
      loading: 'Loading...',
      listener: '{number} listener | {number} listeners',
      track: {
        source: {
          via: 'Via {source}'
        }
      },
      tracks: '{number} track | {number} tracks',
      paginated: {
        noCollection: {
          header: 'No {collection}',
          content: 'Looks like there are no {collection}.'
        }
      },
      sources: {
        select: {
          source: 'Select source:',
          type: 'Select type:',
          album: 'Select album:',
          albumVarious: 'Select V/A album:',
          group: 'Select album group:',
          artist: 'Select artist:',
          track: 'Select track:'
        },
        streamable: 'Streamable',
        other: 'Other',
        albumTypes: {
          album: 'Album',
          albumVarious: 'V/A album',
          group: 'Album group',
          track: 'Track'
        },
        albumsTypes: {
          album: 'Albums',
          single: 'Singles',
          single_ep: 'Singles / EPs',
          compilation: 'Compilations',
          video: 'Videos',
          misc: 'Miscellaneous',
          appearance: 'Appearances'
        }
      },
      profile: {
        form: {
          fields: {
            email: 'Email',
            password: 'Password',
            passwordConfirmation: 'Confirm password',
            nickname: 'Nickname',
            avatar: {
              add: 'Upload avatar',
              remove: 'Remove avatar'
            },
            gender: 'Gender',
            birthdate: 'Birth date',
            country: 'Country',
            city: 'City',
            genders: {
              male: 'Male',
              female: 'Female',
              other: 'Other'
            }
          },
          remember: 'Remember me',
          submit: {
            login: 'Login',
            signup: 'Sign up',
            save: 'Save'
          },
          sections: {
            extra: 'Additional info'
          },
          success: 'Profile saved',
          errors: {
            notFound: 'Email or password is wrong',
            empty: {
              email: 'Email cannot be empty',
              password: 'Password cannot be empty',
              passwordConfirmation: 'Password confirmation cannot be empty',
              nickname: 'Nickname cannot be empty'
            },
            invalid: {
              email: 'Email is invalid'
            },
            taken: {
              email: 'Email is already taken',
              nickname: 'Nickname is already taken'
            },
            tooShort: {
              password: 'Password is too short'
            },
            tooLong: {
              nickname: 'Nickname is too long'
            },
            confirmation: {
              passwordConfirmation: 'Password confirmation doesn\'t match password'
            }
          },
          signup: {
            text: 'Don\'t have an account?',
            link: 'Sign up'
          },
          login: {
            text: 'Already signed up?',
            link: 'Log in'
          }
        }
      }
    }
  }
}
