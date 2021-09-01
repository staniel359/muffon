export default {
  en: {
    layout: {
      navigation: {
        start: 'Start',
        artists: 'Artists',
        tags: 'Tags',
        videos: 'Video',
        profiles: 'Profiles',
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
        videoChannel: {
          videos: 'Videos'
        },
        profile: {
          library: 'Library'
        },
        self: {
          recommendations: 'Recommendations'
        },
        library: {
          artists: 'Artists',
          albums: 'Albums',
          tracks: 'Tracks',
          artist: {
            albums: 'Albums',
            tracks: 'Tracks'
          },
          album: {
            tracks: 'Tracks'
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
        library: 'Library',
        recommendations: 'Recommendations',
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
            queue: 'Queue',
            data: 'Data'
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
          },
          data: {
            cache: {
              clear: 'Clear cache',
              cleared: 'Cache was cleared'
            },
            history: {
              search: {
                clear: 'Clear search history',
                cleared: 'Search history was cleared'
              }
            }
          }
        }
      }
    },
    errors: {
      badRequest: {
        header: 'Bad request',
        content: 'Please make a request with valid data.'
      },
      forbidden: {
        header: 'Forbidden',
        content: 'You don\'t have rights to perform this action.'
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
      track: {
        videos: {
          find: 'Find video',
          select: 'Select video:',
          loading: 'Loading videos...',
          error: 'Error',
          empty: 'No videos'
        },
        lyrics: {
          find: 'Find lyrics',
          select: 'Select lyrics:',
          loading: 'Loading lyrics...',
          error: 'Error',
          empty: 'No lyrics'
        }
      },
      tag: {
        similar: 'Similar:'
      },
      library: {
        statistics: {
          artists: 'Artists',
          albums: 'Albums',
          tracks: 'Tracks'
        },
        since: 'In library since',
        add: {
          header: 'Add to library',
          buttons: {
            folder: 'From folder',
            account: 'From account',
            search: 'From search'
          },
          save: 'Save to library',
          retry: 'Retry',
          folder: {
            select: 'Select folder',
            active: {
              import: 'Importing {value} of {total} files...',
              save: 'Saving {value} of {total} files...'
            },
            error: {
              import: {
                header: '{count} files could not be processed. Please fix these files\' ID3 tags and retry:'
              },
              save: {
                header: '{count} files could not be processed:'
              }
            },
            success: {
              import: {
                header: 'All {count} files were successfuly imported',
                content: 'You might want to check them before saving to library'
              },
              save: {
                header: 'All {count} files were successfuly saved to library'
              }
            }
          },
          account: {
            connect: {
              lastfm: 'Connect Last.FM account'
            },
            import: {
              lastfm: 'Import Last.FM data'
            },
            active: {
              import: 'Importing {value} of {total} plays...',
              save: 'Saving {value} of {total} tracks...'
            },
            error: {
              save: {
                header: '{count} tracks could not be processed:'
              }
            },
            success: {
              import: {
                header: 'All {count} tracks were successfuly imported',
                content: 'You might want to check them before saving to library'
              },
              save: {
                header: 'All {count} tracks were successfuly saved to library'
              }
            }
          },
          search: {
            input: {
              artists: 'Search for artists...',
              albums: 'Search for albums...',
              tracks: 'Search for tracks...'
            },
            select: {
              artists: 'Artists',
              albums: 'Albums',
              tracks: 'Tracks'
            },
            active: {
              save: {
                artists: 'Saving {value} of {total} artists...',
                albums: 'Saving {value} of {total} albums...',
                tracks: 'Saving {value} of {total} tracks...'
              }
            },
            error: {
              save: {
                header: {
                  artists: '{count} artists could not be processed:',
                  albums: '{count} albums could not be processed:',
                  tracks: '{count} tracks could not be processed:'
                }
              }
            },
            success: {
              save: {
                header: {
                  artists: 'All {count} artists were successfuly saved to library',
                  albums: 'All {count} albums were successfuly saved to library',
                  tracks: 'All {count} tracks were successfuly saved to library'
                }
              }
            }
          }
        }
      }
    },
    shared: {
      error: 'Error',
      more: 'More...',
      loading: 'Loading...',
      track: {
        source: {
          via: 'Via {source}'
        }
      },
      tracks: '{count} tracks',
      paginated: {
        noCollection: {
          header: 'No {collection}',
          content: 'Looks like there are no {collection}.'
        }
      },
      sources: {
        find: 'Find in sources',
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
            image: {
              add: 'Upload image'
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
          success: 'Profile was saved',
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
      },
      library: {
        add: 'Add to library',
        show: 'Show in library',
        delete: {
          header: 'Delete from library',
          artist: {
            header: 'Delete artist from library',
            also: 'This will also delete all this artist\'s albums and tracks.'
          },
          album: {
            header: 'Delete album from library',
            also: 'This will also delete all this album\'s tracks.'
          },
          track: {
            header: 'Delete track from library'
          },
          going: 'You are going to delete {modelFullTitle} from your library.',
          undo: 'You can\'t undo this action!',
          sure: 'Are you sure?'
        },
        deleted: '{modelFullTitle} was successfully deleted from your library'
      },
      buttons: {
        cancel: 'Cancel',
        delete: 'Delete'
      },
      recommendation: {
        similar: 'Similar to {count} artists:',
        delete: {
          header: 'Delete recommendation',
          going: 'You are going to delete {artistName} from your recommendations.',
          undo: 'You can\'t undo this action!',
          sure: 'Are you sure?'
        },
        deleted: 'Recommendation was deleted'
      },
      roles: {
        creator: 'Creator'
      },
      listened: {
        add: 'Add to listened',
        added: 'Listened',
        delete: 'Delete from listened'
      }
    }
  }
}
