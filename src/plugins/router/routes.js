import formatHomePageLinkData from '@/helpers/formatters/tabs/home'
import formatFeedPageLinkData from '@/helpers/formatters/tabs/feed'
import formatConversationsPageLinkData
  from '@/helpers/formatters/tabs/conversations'
import formatArtistPageLinkData from '@/helpers/formatters/tabs/artist'
import formatAlbumPageLinkData from '@/helpers/formatters/tabs/album'
import formatTrackPageLinkData from '@/helpers/formatters/tabs/track'
import formatTagPageLinkData from '@/helpers/formatters/tabs/tag'
import formatVideoChannelPageLinkData
  from '@/helpers/formatters/tabs/videoChannel'
import formatVideoPageLinkData from '@/helpers/formatters/tabs/video'
import formatVideoPlaylistPageLinkData
  from '@/helpers/formatters/tabs/videoPlaylist'
import formatProfilesPageLinkData from '@/helpers/formatters/tabs/profiles'
import formatProfilePageLinkData from '@/helpers/formatters/tabs/profile'
import formatProfileLibraryPageLinkData
  from '@/helpers/formatters/tabs/profile/library'
import formatProfileLibraryArtistPageLinkData
  from '@/helpers/formatters/tabs/profile/library/artist'
import formatProfileLibraryAlbumPageLinkData
  from '@/helpers/formatters/tabs/profile/library/album'
import formatProfileLibraryTrackPageLinkData
  from '@/helpers/formatters/tabs/profile/library/track'
import formatProfileLibraryTagPageLinkData
  from '@/helpers/formatters/tabs/profile/library/tag'
import formatRecommendationsPageLinkData
  from '@/helpers/formatters/tabs/recommendations'
import formatBookmarksPageLinkData from '@/helpers/formatters/tabs/bookmarks'
import formatProfileFavoritesPageLinkData
  from '@/helpers/formatters/tabs/profile/favorites'
import formatTopPageLinkData from '@/helpers/formatters/tabs/top'
import formatProfilePlaylistPageLinkData
  from '@/helpers/formatters/tabs/profile/playlist'
import formatRadioPageLinkData from '@/helpers/formatters/tabs/radio'
import formatPlaylistsPageLinkData from '@/helpers/formatters/tabs/playlists'
import formatCommunitiesPageLinkData
  from '@/helpers/formatters/tabs/communities'
import formatCommunityPageLinkData from '@/helpers/formatters/tabs/community'
import formatReleasesPageLinkData from '@/helpers/formatters/tabs/releases'
import formatMultitagPageLinkData from '@/helpers/formatters/tabs/multitag'
import formatSavedTracksPageLinkData
  from '@/helpers/formatters/tabs/savedTracks'
import formatHistoryPageLinkData from '@/helpers/formatters/tabs/history'

const RootPage = () => import(
  '@/views/RootPage.vue'
)
const HomePage = () => import(
  '@/views/HomePage.vue'
)
const FeedPage = () => import(
  '@/views/FeedPage.vue'
)
const ConversationsPage = () => import(
  '@/views/conversations/MainPage.vue'
)
const ConversationPage = () => import(
  '@/views/conversations/ConversationPage.vue'
)
const ArtistMainPage = () => import(
  '@/views/artist/MainPage.vue'
)
const ArtistImagesPage = () => import(
  '@/views/artist/ImagesPage.vue'
)
const ArtistTracksPage = () => import(
  '@/views/artist/TracksPage.vue'
)
const ArtistAlbumsPage = () => import(
  '@/views/artist/AlbumsPage.vue'
)
const ArtistSimilarPage = () => import(
  '@/views/artist/SimilarPage.vue'
)
const AlbumMainPage = () => import(
  '@/views/album/MainPage.vue'
)
const TrackMainPage = () => import(
  '@/views/track/MainPage.vue'
)
const TrackSimilarPage = () => import(
  '@/views/track/SimilarPage.vue'
)
const TagMainPage = () => import(
  '@/views/tag/MainPage.vue'
)
const TagArtistsPage = () => import(
  '@/views/tag/ArtistsPage.vue'
)
const TagAlbumsPage = () => import(
  '@/views/tag/AlbumsPage.vue'
)
const TagTracksPage = () => import(
  '@/views/tag/TracksPage.vue'
)
const VideoChannelMainPage = () => import(
  '@/views/videoChannel/MainPage.vue'
)
const VideoChannelVideosPage = () => import(
  '@/views/videoChannel/VideosPage.vue'
)
const VideoChannelPlaylistsPage = () => import(
  '@/views/videoChannel/PlaylistsPage.vue'
)
const VideoMainPage = () => import(
  '@/views/video/MainPage.vue'
)
const VideoRelatedPage = () => import(
  '@/views/video/RelatedPage.vue'
)
const VideoPlaylistMainPage = () => import(
  '@/views/videoPlaylist/MainPage.vue'
)
const ProfilesPage = () => import(
  '@/views/ProfilesPage.vue'
)
const ProfileMainPage = () => import(
  '@/views/profile/MainPage.vue'
)
const ProfileLibraryMainPage = () => import(
  '@/views/profile/library/MainPage.vue'
)
const ProfileLibraryArtistsPage = () => import(
  '@/views/profile/library/ArtistsPage.vue'
)
const ProfileLibraryArtistMainPage = () => import(
  '@/views/profile/library/artist/MainPage.vue'
)
const ProfileLibraryArtistAlbumsPage = () => import(
  '@/views/profile/library/artist/AlbumsPage.vue'
)
const ProfileLibraryArtistTracksPage = () => import(
  '@/views/profile/library/artist/TracksPage.vue'
)
const ProfileLibraryArtistPlaylistsPage = () => import(
  '@/views/profile/library/artist/PlaylistsPage.vue'
)
const ProfileLibraryAlbumsPage = () => import(
  '@/views/profile/library/AlbumsPage.vue'
)
const ProfileLibraryAlbumMainPage = () => import(
  '@/views/profile/library/album/MainPage.vue'
)
const ProfileLibraryAlbumTracksPage = () => import(
  '@/views/profile/library/album/TracksPage.vue'
)
const ProfileLibraryAlbumPlaylistsPage = () => import(
  '@/views/profile/library/album/PlaylistsPage.vue'
)
const ProfileLibraryTracksPage = () => import(
  '@/views/profile/library/TracksPage.vue'
)
const ProfileLibraryTrackMainPage = () => import(
  '@/views/profile/library/track/MainPage.vue'
)
const ProfileLibraryTrackAlbumsPage = () => import(
  '@/views/profile/library/track/AlbumsPage.vue'
)
const ProfileLibraryTrackPlaylistsPage = () => import(
  '@/views/profile/library/track/PlaylistsPage.vue'
)
const ProfileLibraryTagsPage = () => import(
  '@/views/profile/library/TagsPage.vue'
)
const ProfileLibraryTagMainPage = () => import(
  '@/views/profile/library/tag/MainPage.vue'
)
const ProfileLibraryTagArtistsPage = () => import(
  '@/views/profile/library/tag/ArtistsPage.vue'
)
const RecommendationsPage = () => import(
  '@/views/RecommendationsPage.vue'
)
const BookmarksMainPage = () => import(
  '@/views/bookmarks/MainPage.vue'
)
const BookmarksArtistsPage = () => import(
  '@/views/bookmarks/ArtistsPage.vue'
)
const BookmarksAlbumsPage = () => import(
  '@/views/bookmarks/AlbumsPage.vue'
)
const BookmarksTracksPage = () => import(
  '@/views/bookmarks/TracksPage.vue'
)
const BookmarksVideosPage = () => import(
  '@/views/bookmarks/VideosPage.vue'
)
const BookmarksVideoPlaylistsPage = () => import(
  '@/views/bookmarks/VideoPlaylistsPage.vue'
)
const ProfileFavoritesMainPage = () => import(
  '@/views/profile/favorites/MainPage.vue'
)
const ProfileFavoritesArtistsPage = () => import(
  '@/views/profile/favorites/ArtistsPage.vue'
)
const ProfileFavoritesAlbumsPage = () => import(
  '@/views/profile/favorites/AlbumsPage.vue'
)
const ProfileFavoritesTracksPage = () => import(
  '@/views/profile/favorites/TracksPage.vue'
)
const ProfileFavoritesVideosPage = () => import(
  '@/views/profile/favorites/VideosPage.vue'
)
const TopMainPage = () => import(
  '@/views/top/MainPage.vue'
)
const TopArtistsPage = () => import(
  '@/views/top/ArtistsPage.vue'
)
const TopAlbumsPage = () => import(
  '@/views/top/AlbumsPage.vue'
)
const TopTracksPage = () => import(
  '@/views/top/TracksPage.vue'
)
const TopTagsPage = () => import(
  '@/views/top/TagsPage.vue'
)
const ProfilePlaylistsPage = () => import(
  '@/views/profile/PlaylistsPage.vue'
)
const ProfilePlaylistPage = () => import(
  '@/views/profile/PlaylistPage.vue'
)
const RadioPage = () => import(
  '@/views/RadioPage.vue'
)
const ProfilePostsPage = () => import(
  '@/views/profile/PostsPage.vue'
)
const PlaylistsPage = () => import(
  '@/views/PlaylistsPage.vue'
)
const ProfileCommunitiesPage = () => import(
  '@/views/profile/CommunitiesPage.vue'
)
const CommunitiesPage = () => import(
  '@/views/CommunitiesPage.vue'
)
const CommunityMainPage = () => import(
  '@/views/community/MainPage.vue'
)
const CommunityPostsPage = () => import(
  '@/views/community/PostsPage.vue'
)
const ReleasesMainPage = () => import(
  '@/views/releases/MainPage.vue'
)
const ReleasesNewPage = () => import(
  '@/views/releases/NewPage.vue'
)
const ReleasesUpcomingPage = () => import(
  '@/views/releases/UpcomingPage.vue'
)
const MultitagPage = () => import(
  '@/views/MultitagPage.vue'
)
const SavedTracksPage = () => import(
  '@/views/SavedTracksPage.vue'
)
const AboutPage = () => import(
  '@/views/AboutPage.vue'
)
const HistoryMainPage = () => import(
  '@/views/history/MainPage.vue'
)
const HistoryActivityPage = () => import(
  '@/views/history/ActivityPage.vue'
)
const HistoryPlayerPage = () => import(
  '@/views/history/PlayerPage.vue'
)
const HistoryBrowserPage = () => import(
  '@/views/history/BrowserPage.vue'
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
    props: true,
    meta: {
      formatter:
        formatHomePageLinkData
    }
  },
  {
    path: '/feed',
    exact: true,
    name: 'FeedPage',
    component: FeedPage,
    props: true,
    meta: {
      formatter:
        formatFeedPageLinkData
    }
  },
  {
    path: '/conversations',
    exact: true,
    name: 'ConversationsPage',
    component: ConversationsPage,
    props: true,
    meta: {
      formatter:
        formatConversationsPageLinkData
    }
  },
  {
    path: '/conversations/:conversationId',
    exact: true,
    name: 'ConversationPage',
    component: ConversationPage,
    props: true,
    meta: {
      formatter:
        formatConversationsPageLinkData
    }
  },
  {
    path: '/artists/:artistName',
    exact: true,
    name: 'ArtistMainPage',
    component: ArtistMainPage,
    props: true,
    meta: {
      formatter:
        formatArtistPageLinkData
    }
  },
  {
    path: '/artists/:artistName/images',
    exact: true,
    name: 'ArtistImagesPage',
    component: ArtistImagesPage,
    props: true,
    meta: {
      formatter:
        formatArtistPageLinkData
    }
  },
  {
    path: '/artists/:artistName/tracks',
    exact: true,
    name: 'ArtistTracksPage',
    component: ArtistTracksPage,
    props: true,
    meta: {
      formatter:
        formatArtistPageLinkData
    }
  },
  {
    path: '/artists/:artistName/albums',
    exact: true,
    name: 'ArtistAlbumsPage',
    component: ArtistAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatArtistPageLinkData
    }
  },
  {
    path: '/artists/:artistName/similar',
    exact: true,
    name: 'ArtistSimilarPage',
    component: ArtistSimilarPage,
    props: true,
    meta: {
      formatter:
        formatArtistPageLinkData
    }
  },
  {
    path: '/artists/:artistName/albums/:albumTitle',
    exact: true,
    name: 'AlbumMainPage',
    component: AlbumMainPage,
    props: true,
    meta: {
      formatter:
        formatAlbumPageLinkData
    }
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle',
    exact: true,
    name: 'TrackMainPage',
    component: TrackMainPage,
    props: true,
    meta: {
      formatter:
        formatTrackPageLinkData
    }
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle/similar',
    exact: true,
    name: 'TrackSimilarPage',
    component: TrackSimilarPage,
    props: true,
    meta: {
      formatter:
        formatTrackPageLinkData
    }
  },
  {
    path: '/tags/:tagName',
    exact: true,
    name: 'TagMainPage',
    component: TagMainPage,
    props: true,
    meta: {
      formatter:
        formatTagPageLinkData
    }
  },
  {
    path: '/tags/:tagName/artists',
    exact: true,
    name: 'TagArtistsPage',
    component: TagArtistsPage,
    props: true,
    meta: {
      formatter:
        formatTagPageLinkData
    }
  },
  {
    path: '/tags/:tagName/albums',
    exact: true,
    name: 'TagAlbumsPage',
    component: TagAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatTagPageLinkData
    }
  },
  {
    path: '/tags/:tagName/tracks',
    exact: true,
    name: 'TagTracksPage',
    component: TagTracksPage,
    props: true,
    meta: {
      formatter:
        formatTagPageLinkData
    }
  },
  {
    path: '/video/channels/:channelId',
    exact: true,
    name: 'VideoChannelMainPage',
    component: VideoChannelMainPage,
    props: true,
    meta: {
      formatter:
        formatVideoChannelPageLinkData
    }
  },
  {
    path: '/video/channels/:channelId/videos',
    exact: true,
    name: 'VideoChannelVideosPage',
    component: VideoChannelVideosPage,
    props: true,
    meta: {
      formatter:
        formatVideoChannelPageLinkData
    }
  },
  {
    path: '/video/channels/:channelId/playlists',
    exact: true,
    name: 'VideoChannelPlaylistsPage',
    component: VideoChannelPlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatVideoChannelPageLinkData
    }
  },
  {
    path: '/video/videos/:videoId',
    exact: true,
    name: 'VideoMainPage',
    component: VideoMainPage,
    props: true,
    meta: {
      formatter:
        formatVideoPageLinkData
    }
  },
  {
    path: '/video/videos/:videoId/related',
    exact: true,
    name: 'VideoRelatedPage',
    component: VideoRelatedPage,
    props: true,
    meta: {
      formatter:
        formatVideoPageLinkData
    }
  },
  {
    path: '/video/videoPlaylists/:playlistId',
    exact: true,
    name: 'VideoPlaylistMainPage',
    component: VideoPlaylistMainPage,
    props: true,
    meta: {
      formatter:
        formatVideoPlaylistPageLinkData
    }
  },
  {
    path: '/profiles',
    exact: true,
    name: 'ProfilesPage',
    component: ProfilesPage,
    props: true,
    meta: {
      formatter:
        formatProfilesPageLinkData
    }
  },
  {
    path: '/profiles/:profileId',
    exact: true,
    name: 'ProfileMainPage',
    component: ProfileMainPage,
    props: true,
    meta: {
      formatter:
        formatProfilePageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library',
    exact: true,
    name: 'ProfileLibraryMainPage',
    component: ProfileLibraryMainPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/artists',
    exact: true,
    name: 'ProfileLibraryArtistsPage',
    component: ProfileLibraryArtistsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/artists/:libraryArtistId',
    exact: true,
    name: 'ProfileLibraryArtistMainPage',
    component: ProfileLibraryArtistMainPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryArtistPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/artists/:libraryArtistId/albums',
    exact: true,
    name: 'ProfileLibraryArtistAlbumsPage',
    component: ProfileLibraryArtistAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryArtistPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/artists/:libraryArtistId/tracks',
    exact: true,
    name: 'ProfileLibraryArtistTracksPage',
    component: ProfileLibraryArtistTracksPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryArtistPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/artists/:libraryArtistId/playlists',
    exact: true,
    name: 'ProfileLibraryArtistPlaylistsPage',
    component: ProfileLibraryArtistPlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryArtistPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/albums',
    exact: true,
    name: 'ProfileLibraryAlbumsPage',
    component: ProfileLibraryAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/albums/:libraryAlbumId',
    exact: true,
    name: 'ProfileLibraryAlbumMainPage',
    component: ProfileLibraryAlbumMainPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryAlbumPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/albums/:libraryAlbumId/tracks',
    exact: true,
    name: 'ProfileLibraryAlbumTracksPage',
    component: ProfileLibraryAlbumTracksPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryAlbumPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/albums/:libraryAlbumId/playlists',
    exact: true,
    name: 'ProfileLibraryAlbumPlaylistsPage',
    component: ProfileLibraryAlbumPlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryAlbumPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tracks',
    exact: true,
    name: 'ProfileLibraryTracksPage',
    component: ProfileLibraryTracksPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tracks/:libraryTrackId',
    exact: true,
    name: 'ProfileLibraryTrackMainPage',
    component: ProfileLibraryTrackMainPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryTrackPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tracks/:libraryTrackId/albums',
    exact: true,
    name: 'ProfileLibraryTrackAlbumsPage',
    component: ProfileLibraryTrackAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryTrackPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tracks/:libraryTrackId/playlists',
    exact: true,
    name: 'ProfileLibraryTrackPlaylistsPage',
    component: ProfileLibraryTrackPlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryTrackPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tags',
    exact: true,
    name: 'ProfileLibraryTagsPage',
    component: ProfileLibraryTagsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tags/:libraryTagId',
    exact: true,
    name: 'ProfileLibraryTagMainPage',
    component: ProfileLibraryTagMainPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryTagPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library/tags/:libraryTagId/artists',
    exact: true,
    name: 'ProfileLibraryTagArtistsPage',
    component: ProfileLibraryTagArtistsPage,
    props: true,
    meta: {
      formatter:
        formatProfileLibraryTagPageLinkData
    }
  },
  {
    path: '/recommendations',
    exact: true,
    name: 'RecommendationsPage',
    component: RecommendationsPage,
    props: true,
    meta: {
      formatter:
        formatRecommendationsPageLinkData
    }
  },
  {
    path: '/bookmarks',
    exact: true,
    name: 'BookmarksMainPage',
    component: BookmarksMainPage,
    props: true,
    meta: {
      formatter:
        formatBookmarksPageLinkData
    }
  },
  {
    path: '/bookmarks/artists',
    exact: true,
    name: 'BookmarksArtistsPage',
    component: BookmarksArtistsPage,
    props: true,
    meta: {
      formatter:
        formatBookmarksPageLinkData
    }
  },
  {
    path: '/bookmarks/albums',
    exact: true,
    name: 'BookmarksAlbumsPage',
    component: BookmarksAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatBookmarksPageLinkData
    }
  },
  {
    path: '/bookmarks/tracks',
    exact: true,
    name: 'BookmarksTracksPage',
    component: BookmarksTracksPage,
    props: true,
    meta: {
      formatter:
        formatBookmarksPageLinkData
    }
  },
  {
    path: '/bookmarks/videos',
    exact: true,
    name: 'BookmarksVideosPage',
    component: BookmarksVideosPage,
    props: true,
    meta: {
      formatter:
        formatBookmarksPageLinkData
    }
  },
  {
    path: '/bookmarks/video_playlists',
    exact: true,
    name: 'BookmarksVideoPlaylistsPage',
    component: BookmarksVideoPlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatBookmarksPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/favorites',
    exact: true,
    name: 'ProfileFavoritesMainPage',
    component: ProfileFavoritesMainPage,
    props: true,
    meta: {
      formatter:
        formatProfileFavoritesPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/favorites/artists',
    exact: true,
    name: 'ProfileFavoritesArtistsPage',
    component: ProfileFavoritesArtistsPage,
    props: true,
    meta: {
      formatter:
        formatProfileFavoritesPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/favorites/albums',
    exact: true,
    name: 'ProfileFavoritesAlbumsPage',
    component: ProfileFavoritesAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatProfileFavoritesPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/favorites/tracks',
    exact: true,
    name: 'ProfileFavoritesTracksPage',
    component: ProfileFavoritesTracksPage,
    props: true,
    meta: {
      formatter:
        formatProfileFavoritesPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/favorites/videos',
    exact: true,
    name: 'ProfileFavoritesVideosPage',
    component: ProfileFavoritesVideosPage,
    props: true,
    meta: {
      formatter:
        formatProfileFavoritesPageLinkData
    }
  },
  {
    path: '/top',
    exact: true,
    name: 'TopMainPage',
    component: TopMainPage,
    props: true,
    meta: {
      formatter:
        formatTopPageLinkData
    }
  },
  {
    path: '/top/artists',
    exact: true,
    name: 'TopArtistsPage',
    component: TopArtistsPage,
    props: true,
    meta: {
      formatter:
        formatTopPageLinkData
    }
  },
  {
    path: '/top/albums',
    exact: true,
    name: 'TopAlbumsPage',
    component: TopAlbumsPage,
    props: true,
    meta: {
      formatter:
        formatTopPageLinkData
    }
  },
  {
    path: '/top/tracks',
    exact: true,
    name: 'TopTracksPage',
    component: TopTracksPage,
    props: true,
    meta: {
      formatter:
        formatTopPageLinkData
    }
  },
  {
    path: '/top/tags',
    exact: true,
    name: 'TopTagsPage',
    component: TopTagsPage,
    props: true,
    meta: {
      formatter:
        formatTopPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/playlists',
    exact: true,
    name: 'ProfilePlaylistsPage',
    component: ProfilePlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatProfilePageLinkData
    }
  },
  {
    path: '/profiles/:profileId/playlists/:playlistId',
    exact: true,
    name: 'ProfilePlaylistPage',
    component: ProfilePlaylistPage,
    props: true,
    meta: {
      formatter:
        formatProfilePlaylistPageLinkData
    }
  },
  {
    path: '/radio',
    exact: true,
    name: 'RadioPage',
    component: RadioPage,
    props: true,
    meta: {
      formatter:
        formatRadioPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/posts',
    exact: true,
    name: 'ProfilePostsPage',
    component: ProfilePostsPage,
    props: true,
    meta: {
      formatter:
        formatProfilePageLinkData
    }
  },
  {
    path: '/playlists',
    exact: true,
    name: 'PlaylistsPage',
    component: PlaylistsPage,
    props: true,
    meta: {
      formatter:
        formatPlaylistsPageLinkData
    }
  },
  {
    path: '/profiles/:profileId/communities',
    exact: true,
    name: 'ProfileCommunitiesPage',
    component: ProfileCommunitiesPage,
    props: true,
    meta: {
      formatter:
        formatProfilePageLinkData
    }
  },
  {
    path: '/communities',
    exact: true,
    name: 'CommunitiesPage',
    component: CommunitiesPage,
    props: true,
    meta: {
      formatter:
        formatCommunitiesPageLinkData
    }
  },
  {
    path: '/communities/:communityId',
    exact: true,
    name: 'CommunityMainPage',
    component: CommunityMainPage,
    props: true,
    meta: {
      formatter:
        formatCommunityPageLinkData
    }
  },
  {
    path: '/communities/:communityId/posts',
    exact: true,
    name: 'CommunityPostsPage',
    component: CommunityPostsPage,
    props: true,
    meta: {
      formatter:
        formatCommunityPageLinkData
    }
  },
  {
    path: '/releases',
    exact: true,
    name: 'ReleasesMainPage',
    component: ReleasesMainPage,
    props: true,
    meta: {
      formatter:
        formatReleasesPageLinkData
    }
  },
  {
    path: '/releases/new',
    exact: true,
    name: 'ReleasesNewPage',
    component: ReleasesNewPage,
    props: true,
    meta: {
      formatter:
        formatReleasesPageLinkData
    }
  },
  {
    path: '/releases/upcoming',
    exact: true,
    name: 'ReleasesUpcomingPage',
    component: ReleasesUpcomingPage,
    props: true,
    meta: {
      formatter:
        formatReleasesPageLinkData
    }
  },
  {
    path: '/multitag',
    exact: true,
    name: 'MultitagPage',
    component: MultitagPage,
    props: true,
    meta: {
      formatter:
        formatMultitagPageLinkData
    }
  },
  {
    path: '/saved_tracks',
    exact: true,
    name: 'SavedTracksPage',
    component: SavedTracksPage,
    props: true,
    meta: {
      formatter:
        formatSavedTracksPageLinkData
    }
  },
  {
    path: '/about',
    exact: true,
    name: 'AboutPage',
    component: AboutPage,
    props: true
  },
  {
    path: '/history',
    exact: true,
    name: 'HistoryMainPage',
    component: HistoryMainPage,
    props: true,
    meta: {
      formatter:
        formatHistoryPageLinkData
    }
  },
  {
    path: '/history/activity',
    exact: true,
    name: 'HistoryActivityPage',
    component: HistoryActivityPage,
    props: true,
    meta: {
      formatter:
        formatHistoryPageLinkData
    }
  },
  {
    path: '/history/player',
    exact: true,
    name: 'HistoryPlayerPage',
    component: HistoryPlayerPage,
    props: true,
    meta: {
      formatter:
        formatHistoryPageLinkData
    }
  },
  {
    path: '/history/browser',
    exact: true,
    name: 'HistoryBrowserPage',
    component: HistoryBrowserPage,
    props: true,
    meta: {
      formatter:
        formatHistoryPageLinkData
    }
  }
]
