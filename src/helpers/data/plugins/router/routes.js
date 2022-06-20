const RootPage = () => import(
  '*/views/RootPage.vue'
)
const HomePage = () => import(
  '*/views/HomePage.vue'
)
const FeedPage = () => import(
  '*/views/FeedPage.vue'
)
const ConversationsPage = () => import(
  '*/views/conversations/MainPage.vue'
)
const ConversationPage = () => import(
  '*/views/conversations/ConversationPage.vue'
)
const ArtistMainPage = () => import(
  '*/views/artist/MainPage.vue'
)
const ArtistImagesPage = () => import(
  '*/views/artist/ImagesPage.vue'
)
const ArtistTracksPage = () => import(
  '*/views/artist/TracksPage.vue'
)
const ArtistAlbumsPage = () => import(
  '*/views/artist/AlbumsPage.vue'
)
const ArtistSimilarPage = () => import(
  '*/views/artist/SimilarPage.vue'
)
const AlbumMainPage = () => import(
  '*/views/album/MainPage.vue'
)
const TrackMainPage = () => import(
  '*/views/track/MainPage.vue'
)
const TrackSimilarPage = () => import(
  '*/views/track/SimilarPage.vue'
)
const TagMainPage = () => import(
  '*/views/tag/MainPage.vue'
)
const TagArtistsPage = () => import(
  '*/views/tag/ArtistsPage.vue'
)
const TagAlbumsPage = () => import(
  '*/views/tag/AlbumsPage.vue'
)
const TagTracksPage = () => import(
  '*/views/tag/TracksPage.vue'
)
const VideoChannelVideosPage = () => import(
  '*/views/video/channel/VideosPage.vue'
)
const VideoMainPage = () => import(
  '*/views/video/MainPage.vue'
)
const VideoRelatedPage = () => import(
  '*/views/video/RelatedPage.vue'
)
const ProfilesPage = () => import(
  '*/views/ProfilesPage.vue'
)
const ProfileMainPage = () => import(
  '*/views/profile/MainPage.vue'
)
const ProfileLibraryMainPage = () => import(
  '*/views/profile/library/MainPage.vue'
)
const ProfileLibraryArtistsPage = () => import(
  '*/views/profile/library/ArtistsPage.vue'
)
const ProfileLibraryArtistMainPage = () => import(
  '*/views/profile/library/artist/MainPage.vue'
)
const ProfileLibraryArtistAlbumsPage = () => import(
  '*/views/profile/library/artist/AlbumsPage.vue'
)
const ProfileLibraryArtistTracksPage = () => import(
  '*/views/profile/library/artist/TracksPage.vue'
)
const ProfileLibraryAlbumsPage = () => import(
  '*/views/profile/library/AlbumsPage.vue'
)
const ProfileLibraryAlbumMainPage = () => import(
  '*/views/profile/library/album/MainPage.vue'
)
const ProfileLibraryAlbumTracksPage = () => import(
  '*/views/profile/library/album/TracksPage.vue'
)
const ProfileLibraryTracksPage = () => import(
  '*/views/profile/library/TracksPage.vue'
)
const ProfileLibraryTrackMainPage = () => import(
  '*/views/profile/library/track/MainPage.vue'
)
const ProfileLibraryTagsPage = () => import(
  '*/views/profile/library/TagsPage.vue'
)
const ProfileLibraryTagMainPage = () => import(
  '*/views/profile/library/tag/MainPage.vue'
)
const ProfileLibraryTagArtistsPage = () => import(
  '*/views/profile/library/tag/ArtistsPage.vue'
)
const RecommendationsPage = () => import(
  '*/views/RecommendationsPage.vue'
)
const BookmarksMainPage = () => import(
  '*/views/bookmarks/MainPage.vue'
)
const BookmarksArtistsPage = () => import(
  '*/views/bookmarks/ArtistsPage.vue'
)
const BookmarksAlbumsPage = () => import(
  '*/views/bookmarks/AlbumsPage.vue'
)
const BookmarksTracksPage = () => import(
  '*/views/bookmarks/TracksPage.vue'
)
const ProfileFavoritesMainPage = () => import(
  '*/views/profile/favorites/MainPage.vue'
)
const ProfileFavoritesArtistsPage = () => import(
  '*/views/profile/favorites/ArtistsPage.vue'
)
const ProfileFavoritesAlbumsPage = () => import(
  '*/views/profile/favorites/AlbumsPage.vue'
)
const ProfileFavoritesTracksPage = () => import(
  '*/views/profile/favorites/TracksPage.vue'
)
const TopMainPage = () => import(
  '*/views/top/MainPage.vue'
)
const TopArtistsPage = () => import(
  '*/views/top/ArtistsPage.vue'
)
const TopAlbumsPage = () => import(
  '*/views/top/AlbumsPage.vue'
)
const TopTracksPage = () => import(
  '*/views/top/TracksPage.vue'
)
const TopTagsPage = () => import(
  '*/views/top/TagsPage.vue'
)
const ProfilePlaylistsPage = () => import(
  '*/views/profile/PlaylistsPage.vue'
)
const ProfilePlaylistPage = () => import(
  '*/views/profile/PlaylistPage.vue'
)
const RadioPage = () => import(
  '*/views/RadioPage.vue'
)
const ProfilePostsPage = () => import(
  '*/views/profile/PostsPage.vue'
)
const PlaylistsPage = () => import(
  '*/views/PlaylistsPage.vue'
)
const ProfileCommunitiesPage = () => import(
  '*/views/profile/CommunitiesPage.vue'
)
const CommunitiesPage = () => import(
  '*/views/CommunitiesPage.vue'
)
const CommunityMainPage = () => import(
  '*/views/community/MainPage.vue'
)
const CommunityPostsPage = () => import(
  '*/views/community/PostsPage.vue'
)
const ReleasesMainPage = () => import(
  '*/views/releases/MainPage.vue'
)
const ReleasesNewPage = () => import(
  '*/views/releases/NewPage.vue'
)
const ReleasesUpcomingPage = () => import(
  '*/views/releases/UpcomingPage.vue'
)
const MultitagPage = () => import(
  '*/views/MultitagPage.vue'
)
const SavedTracksPage = () => import(
  '*/views/SavedTracksPage.vue'
)

export default [
  {
    path: '/',
    exact: true,
    name: 'RootPage',
    component: RootPage,
    props: true
  },
  {
    path: '/home',
    exact: true,
    name: 'HomePage',
    component: HomePage,
    props: true
  },
  {
    path: '/feed',
    exact: true,
    name: 'FeedPage',
    component: FeedPage,
    props: true
  },
  {
    path: '/conversations',
    exact: true,
    name: 'ConversationsPage',
    component: ConversationsPage,
    props: true
  },
  {
    path: '/conversations/:conversationId',
    exact: true,
    name: 'ConversationPage',
    component: ConversationPage,
    props: true
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
    path: '/video/videos/:videoId/related',
    exact: true,
    name: 'VideoRelatedPage',
    component: VideoRelatedPage,
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
    path: '/profiles/:profileId/library/artists/:libraryArtistId',
    exact: true,
    name: 'ProfileLibraryArtistMainPage',
    component: ProfileLibraryArtistMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/artists/:libraryArtistId/albums',
    exact: true,
    name: 'ProfileLibraryArtistAlbumsPage',
    component: ProfileLibraryArtistAlbumsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/artists/:libraryArtistId/tracks',
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
    path: '/profiles/:profileId/library/albums/:libraryAlbumId',
    exact: true,
    name: 'ProfileLibraryAlbumMainPage',
    component: ProfileLibraryAlbumMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/albums/:libraryAlbumId/tracks',
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
    path: '/profiles/:profileId/library/tracks/:libraryTrackId',
    exact: true,
    name: 'ProfileLibraryTrackMainPage',
    component: ProfileLibraryTrackMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/tags',
    exact: true,
    name: 'ProfileLibraryTagsPage',
    component: ProfileLibraryTagsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/tags/:libraryTagId',
    exact: true,
    name: 'ProfileLibraryTagMainPage',
    component: ProfileLibraryTagMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/library/tags/:libraryTagId/artists',
    exact: true,
    name: 'ProfileLibraryTagArtistsPage',
    component: ProfileLibraryTagArtistsPage,
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
    name: 'BookmarksMainPage',
    component: BookmarksMainPage,
    props: true
  },
  {
    path: '/bookmarks/artists',
    exact: true,
    name: 'BookmarksArtistsPage',
    component: BookmarksArtistsPage,
    props: true
  },
  {
    path: '/bookmarks/albums',
    exact: true,
    name: 'BookmarksAlbumsPage',
    component: BookmarksAlbumsPage,
    props: true
  },
  {
    path: '/bookmarks/tracks',
    exact: true,
    name: 'BookmarksTracksPage',
    component: BookmarksTracksPage,
    props: true
  },
  {
    path: '/profiles/:profileId/favorites',
    exact: true,
    name: 'ProfileFavoritesMainPage',
    component: ProfileFavoritesMainPage,
    props: true
  },
  {
    path: '/profiles/:profileId/favorites/artists',
    exact: true,
    name: 'ProfileFavoritesArtistsPage',
    component: ProfileFavoritesArtistsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/favorites/albums',
    exact: true,
    name: 'ProfileFavoritesAlbumsPage',
    component: ProfileFavoritesAlbumsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/favorites/tracks',
    exact: true,
    name: 'ProfileFavoritesTracksPage',
    component: ProfileFavoritesTracksPage,
    props: true
  },
  {
    path: '/top',
    exact: true,
    name: 'TopMainPage',
    component: TopMainPage,
    props: true
  },
  {
    path: '/top/artists',
    exact: true,
    name: 'TopArtistsPage',
    component: TopArtistsPage,
    props: true
  },
  {
    path: '/top/albums',
    exact: true,
    name: 'TopAlbumsPage',
    component: TopAlbumsPage,
    props: true
  },
  {
    path: '/top/tracks',
    exact: true,
    name: 'TopTracksPage',
    component: TopTracksPage,
    props: true
  },
  {
    path: '/top/tags',
    exact: true,
    name: 'TopTagsPage',
    component: TopTagsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/playlists',
    exact: true,
    name: 'ProfilePlaylistsPage',
    component: ProfilePlaylistsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/playlists/:playlistId',
    exact: true,
    name: 'ProfilePlaylistPage',
    component: ProfilePlaylistPage,
    props: true
  },
  {
    path: '/radio',
    exact: true,
    name: 'RadioPage',
    component: RadioPage,
    props: true
  },
  {
    path: '/profiles/:profileId/posts',
    exact: true,
    name: 'ProfilePostsPage',
    component: ProfilePostsPage,
    props: true
  },
  {
    path: '/playlists',
    exact: true,
    name: 'PlaylistsPage',
    component: PlaylistsPage,
    props: true
  },
  {
    path: '/profiles/:profileId/communities',
    exact: true,
    name: 'ProfileCommunitiesPage',
    component: ProfileCommunitiesPage,
    props: true
  },
  {
    path: '/communities',
    exact: true,
    name: 'CommunitiesPage',
    component: CommunitiesPage,
    props: true
  },
  {
    path: '/communities/:communityId',
    exact: true,
    name: 'CommunityMainPage',
    component: CommunityMainPage,
    props: true
  },
  {
    path: '/communities/:communityId/posts',
    exact: true,
    name: 'CommunityPostsPage',
    component: CommunityPostsPage,
    props: true
  },
  {
    path: '/releases',
    exact: true,
    name: 'ReleasesMainPage',
    component: ReleasesMainPage,
    props: true
  },
  {
    path: '/releases/new',
    exact: true,
    name: 'ReleasesNewPage',
    component: ReleasesNewPage,
    props: true
  },
  {
    path: '/releases/upcoming',
    exact: true,
    name: 'ReleasesUpcomingPage',
    component: ReleasesUpcomingPage,
    props: true
  },
  {
    path: '/multitag',
    exact: true,
    name: 'MultitagPage',
    component: MultitagPage,
    props: true
  },
  {
    path: '/saved_tracks',
    exact: true,
    name: 'SavedTracksPage',
    component: SavedTracksPage,
    props: true
  }
]
