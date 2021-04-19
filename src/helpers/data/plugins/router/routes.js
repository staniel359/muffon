import HomePage from '$/HomePage.vue'
import ArtistMainPage from '$/artist/MainPage.vue'
import ArtistImagesPage from '$/artist/ImagesPage.vue'
import ArtistTracksPage from '$/artist/TracksPage.vue'
import ArtistAlbumsPage from '$/artist/AlbumsPage.vue'
import ArtistSimilarPage from '$/artist/SimilarPage.vue'
import AlbumMainPage from '$/album/MainPage.vue'
import TrackMainPage from '$/track/MainPage.vue'
import TrackSimilarPage from '$/track/SimilarPage.vue'
import TagMainPage from '$/tag/MainPage.vue'
import TagArtistsPage from '$/tag/ArtistsPage.vue'
import TagAlbumsPage from '$/tag/AlbumsPage.vue'
import TagTracksPage from '$/tag/TracksPage.vue'

export default [
  {
    path: '/',
    exact: true,
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/artists/:artistName',
    exact: true,
    name: 'ArtistMainPage',
    component: ArtistMainPage
  },
  {
    path: '/artists/:artistName/images',
    exact: true,
    name: 'ArtistImagesPage',
    component: ArtistImagesPage
  },
  {
    path: '/artists/:artistName/tracks',
    exact: true,
    name: 'ArtistTracksPage',
    component: ArtistTracksPage
  },
  {
    path: '/artists/:artistName/albums',
    exact: true,
    name: 'ArtistAlbumsPage',
    component: ArtistAlbumsPage
  },
  {
    path: '/artists/:artistName/similar',
    exact: true,
    name: 'ArtistSimilarPage',
    component: ArtistSimilarPage
  },
  {
    path: '/artists/:artistName/albums/:albumTitle',
    exact: true,
    name: 'AlbumMainPage',
    component: AlbumMainPage
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle',
    exact: true,
    name: 'TrackMainPage',
    component: TrackMainPage
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle/similar',
    exact: true,
    name: 'TrackSimilarPage',
    component: TrackSimilarPage
  },
  {
    path: '/tags/:tagName',
    exact: true,
    name: 'TagMainPage',
    component: TagMainPage
  },
  {
    path: '/tags/:tagName/artists',
    exact: true,
    name: 'TagArtistsPage',
    component: TagArtistsPage
  },
  {
    path: '/tags/:tagName/albums',
    exact: true,
    name: 'TagAlbumsPage',
    component: TagAlbumsPage
  },
  {
    path: '/tags/:tagName/tracks',
    exact: true,
    name: 'TagTracksPage',
    component: TagTracksPage
  }
]
