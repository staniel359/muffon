import { localize } from '#/actions/plugins/i18n'

export default [
  {
    name: localize(
      'layout.search.tabs.artists'
    ),
    scope: 'artists',
    clientPageLimit: 20,
    responsePageLimit: 20,
    component: 'BaseArtistsSimpleList',
    isWithListenersCount: true,
    isSmall: true
  },
  {
    name: localize(
      'layout.search.tabs.albums'
    ),
    scope: 'albums',
    clientPageLimit: 20,
    responsePageLimit: 20,
    component: 'BaseAlbumsSimpleList',
    isWithListenersCount: true,
    isSmall: false
  },
  {
    name: localize(
      'layout.search.tabs.tracks'
    ),
    scope: 'tracks',
    clientPageLimit: 50,
    responsePageLimit: 50,
    component: 'BaseTracksSimpleList',
    isWithListenersCount: false,
    isSmall: false
  }
]
