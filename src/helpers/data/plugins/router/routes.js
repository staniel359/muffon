const RootPage = () => import(
  '%/RootPage.vue'
)
const StartPage = () => import(
  '%/StartPage.vue'
)
const ArtistMainPage = () => import(
  '%/artist/MainPage.vue'
)
const ArtistImagesPage = () => import(
  '%/artist/ImagesPage.vue'
)
const ArtistTracksPage = () => import(
  '%/artist/TracksPage.vue'
)
const ArtistAlbumsPage = () => import(
  '%/artist/AlbumsPage.vue'
)
const ArtistSimilarPage = () => import(
  '%/artist/SimilarPage.vue'
)
const AlbumMainPage = () => import(
  '%/album/MainPage.vue'
)
const TrackMainPage = () => import(
  '%/track/MainPage.vue'
)
const TrackSimilarPage = () => import(
  '%/track/SimilarPage.vue'
)
const TagMainPage = () => import(
  '%/tag/MainPage.vue'
)
const TagArtistsPage = () => import(
  '%/tag/ArtistsPage.vue'
)
const TagAlbumsPage = () => import(
  '%/tag/AlbumsPage.vue'
)
const TagTracksPage = () => import(
  '%/tag/TracksPage.vue'
)
const VideoChannelVideosPage = () => import(
  '%/video/channel/VideosPage.vue'
)
const VideoMainPage = () => import(
  '%/video/MainPage.vue'
)
const ProfilesPage = () => import(
  '%/ProfilesPage.vue'
)
const ProfileMainPage = () => import(
  '%/profile/MainPage.vue'
)
const ProfileLibraryMainPage = () => import(
  '%/profile/library/MainPage.vue'
)
const ProfileLibraryArtistsPage = () => import(
  '%/profile/library/ArtistsPage.vue'
)
const ProfileLibraryArtistMainPage = () => import(
  '%/profile/library/artist/MainPage.vue'
)
const ProfileLibraryArtistAlbumsPage = () => import(
  '%/profile/library/artist/AlbumsPage.vue'
)
const ProfileLibraryArtistTracksPage = () => import(
  '%/profile/library/artist/TracksPage.vue'
)
const ProfileLibraryAlbumsPage = () => import(
  '%/profile/library/AlbumsPage.vue'
)
const ProfileLibraryAlbumMainPage = () => import(
  '%/profile/library/album/MainPage.vue'
)
const ProfileLibraryAlbumTracksPage = () => import(
  '%/profile/library/album/TracksPage.vue'
)
const ProfileLibraryTracksPage = () => import(
  '%/profile/library/TracksPage.vue'
)
const ProfileLibraryTrackMainPage = () => import(
  '%/profile/library/track/MainPage.vue'
)
const RecommendationsPage = () => import(
  '%/RecommendationsPage.vue'
)
const BookmarksPage = () => import(
  '%/BookmarksPage.vue'
)

export default [
  {
    path: '/',
    exact: true,
    name: 'RootPage',
    component: RootPage
  },
  {
    path: '/start',
    exact: true,
    name: 'StartPage',
    component: StartPage
  },
  {
    path: '/artists/:artistName',
    exact: true,
    name: 'ArtistMainPage',
    component: ArtistMainPage,
    props: true
  },
  {
    path: '/artists/:artistName/images',
    exact: true,
    name: 'ArtistImagesPage',
    component: ArtistImagesPage,
    props: true
  },
  {
    path: '/artists/:artistName/tracks',
    exact: true,
    name: 'ArtistTracksPage',
    component: ArtistTracksPage,
    props: true
  },
  {
    path: '/artists/:artistName/albums',
    exact: true,
    name: 'ArtistAlbumsPage',
    component: ArtistAlbumsPage,
    props: true
  },
  {
    path: '/artists/:artistName/similar',
    exact: true,
    name: 'ArtistSimilarPage',
    component: ArtistSimilarPage,
    props: true
  },
  {
    path: '/artists/:artistName/albums/:albumTitle',
    exact: true,
    name: 'AlbumMainPage',
    component: AlbumMainPage,
    props: true
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle',
    exact: true,
    name: 'TrackMainPage',
    component: TrackMainPage,
    props: true
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle/similar',
    exact: true,
    name: 'TrackSimilarPage',
    component: TrackSimilarPage,
    props: true
  },
  {
    path: '/tags/:tagName',
    exact: true,
    name: 'TagMainPage',
    component: TagMainPage,
    props: true
  },
  {
    path: '/tags/:tagName/artists',
    exact: true,
    name: 'TagArtistsPage',
    component: TagArtistsPage,
    props: true
  },
  {
    path: '/tags/:tagName/albums',
    exact: true,
    name: 'TagAlbumsPage',
    component: TagAlbumsPage,
    props: true
  },
  {
    path: '/tags/:tagName/tracks',
    exact: true,
    name: 'TagTracksPage',
    component: TagTracksPage,
    props: true
  },
  {
    path: '/video/channels/:channelId/videos',
    exact: true,
    name: 'VideoChannelVideosPage',
    component: VideoChannelVideosPage,
    props: true
  },
  {
    path: '/video/videos/:videoId',
    exact: true,
    name: 'VideoMainPage',
    component: VideoMainPage,
    props: true
  },
  {
    path: '/profiles',
    exact: true,
    name: 'ProfilesPage',
    component: ProfilesPage,
    props: true
  },
  {
    path: '/profiles/:profileId',
    exact: true,
    name: 'ProfileMainPage',
    component: ProfileMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library',
    exact: true,
    name: 'ProfileLibraryMainPage',
    component: ProfileLibraryMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/artists',
    exact: true,
    name: 'ProfileLibraryArtistsPage',
    component: ProfileLibraryArtistsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/artists/:artistId',
    exact: true,
    name: 'ProfileLibraryArtistMainPage',
    component: ProfileLibraryArtistMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/artists/:artistId/albums',
    exact: true,
    name: 'ProfileLibraryArtistAlbumsPage',
    component: ProfileLibraryArtistAlbumsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/artists/:artistId/tracks',
    exact: true,
    name: 'ProfileLibraryArtistTracksPage',
    component: ProfileLibraryArtistTracksPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/albums',
    exact: true,
    name: 'ProfileLibraryAlbumsPage',
    component: ProfileLibraryAlbumsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/albums/:albumId',
    exact: true,
    name: 'ProfileLibraryAlbumMainPage',
    component: ProfileLibraryAlbumMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/albums/:albumId/tracks',
    exact: true,
    name: 'ProfileLibraryAlbumTracksPage',
    component: ProfileLibraryAlbumTracksPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/tracks',
    exact: true,
    name: 'ProfileLibraryTracksPage',
    component: ProfileLibraryTracksPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/tracks/:trackId',
    exact: true,
    name: 'ProfileLibraryTrackMainPage',
    component: ProfileLibraryTrackMainPage,
    props: true
  },
  {
    path: '/recommendations',
    exact: true,
    name: 'RecommendationsPage',
    component: RecommendationsPage,
    props: true
  },
  {
    path: '/bookmarks',
    exact: true,
    name: 'BookmarksPage',
    component: BookmarksPage,
    props: true
  }
]
