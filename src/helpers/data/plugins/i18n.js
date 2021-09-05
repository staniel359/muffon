export default {
  en: {
    layout: {
      navigation: {
        start: 'Start',
        artists: 'Artists',
        albums: 'Albums',
        tracks: 'Tracks',
        tags: 'Tags',
        similar: 'Similar',
        images: 'Images',
        videoChannels: 'Video channels',
        videos: 'Videos',
        profiles: 'Profiles',
        library: 'Library',
        recommendations: 'Recommendations',
        bookmarks: 'Bookmarks'
      },
      search: {
        input: 'Enter something...'
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
        sections: {
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
          empty: 'No videos'
        },
        lyrics: {
          find: 'Find lyrics',
          select: 'Select lyrics:',
          loading: 'Loading lyrics...',
          empty: 'No lyrics'
        }
      },
      library: {
        since: 'In library since',
        add: {
          buttons: {
            folder: 'From folder',
            account: 'From account',
            search: 'From search',
            save: 'Save to library',
            retry: 'Retry'
          },
          search: {
            input: {
              artists: 'Search for artists...',
              albums: 'Search for albums...',
              tracks: 'Search for tracks...'
            }
          },
          account: {
            connect: {
              lastfm: 'Connect Last.FM account'
            },
            import: {
              lastfm: 'Import Last.FM data'
            }
          },
          folder: {
            select: 'Select folder'
          },
          import: {
            active: {
              tracks: 'Importing {value} of {total} tracks...',
              plays: 'Importing {value} of {total} plays...'
            },
            success: {
              tracks: {
                header: 'All {count} tracks were successfuly imported',
                content: 'You may want to check them before saving to library'
              }
            },
            error: {
              files: '{count} files could not be imported. Please fix these files\' ID3 tags and retry:'
            }
          },
          save: {
            active: {
              artists: 'Saving {value} of {total} artists...',
              albums: 'Saving {value} of {total} albums...',
              tracks: 'Saving {value} of {total} tracks...'
            },
            success: {
              artists: 'All {count} artists were successfuly saved to library',
              albums: 'All {count} albums were successfuly saved to library',
              tracks: 'All {count} tracks were successfuly saved to library'
            },
            error: {
              artists: '{count} artists could not be processed:',
              albums: '{count} albums could not be processed:',
              tracks: '{count} tracks could not be processed:'
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
        source: 'Via {source}'
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
            image: 'Upload image',
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
            login: 'Log in',
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
        },
        roles: {
          creator: 'Creator'
        }
      },
      buttons: {
        cancel: 'Cancel',
        delete: 'Delete'
      },
      modal: {
        undo: 'You can\'t undo this action!',
        sure: 'Are you sure?'
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
          going: 'You are going to delete {modelTitle} from your library.'
        },
        deleted: '{modelTitle} was successfully deleted from your library'
      },
      recommendation: {
        similar: 'Similar to {count} artists:',
        delete: {
          header: 'Delete recommendation',
          going: 'You are going to delete {artistName} from your recommendations.'
        },
        deleted: 'Recommendation was deleted'
      },
      listened: {
        add: 'Add to listened',
        added: 'Listened',
        delete: 'Delete from listened'
      },
      bookmarks: {
        add: 'Add to bookmarks',
        added: 'Bookmarked',
        delete: 'Delete from bookmarks'
      },
      bookmark: {
        delete: {
          header: 'Delete bookmark',
          going: 'You are going to delete {modelName} from your bookmarks.'
        },
        deleted: 'Bookmark was deleted'
      }
    }
  }
}
