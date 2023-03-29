import formatHomePageLinkData from '@/helpers/formatters/tabs/home'
import formatFeedPageLinkData from '@/helpers/formatters/tabs/feed'
import formatConversationsPageLinkData
  from '@/helpers/formatters/tabs/conversations'
import formatConversationPageLinkData
  from '@/helpers/formatters/tabs/conversation'
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
  '@/pages/RootPage.vue'
)
const HomePage = () => import(
  '@/pages/home/MainPage.vue'
)
const FeedPage = () => import(
  '@/pages/feed/MainPage.vue'
)
const ConversationsPage = () => import(
  '@/pages/conversations/MainPage.vue'
)
const ConversationPage = () => import(
  '@/pages/conversation/MainPage.vue'
)
const ArtistPage = () => import(
  '@/pages/artist/MainPage.vue'
)
const ArtistImagesPage = () => import(
  '@/pages/artist/ImagesPage.vue'
)
const ArtistTracksPage = () => import(
  '@/pages/artist/TracksPage.vue'
)
const ArtistAlbumsPage = () => import(
  '@/pages/artist/AlbumsPage.vue'
)
const ArtistSimilarPage = () => import(
  '@/pages/artist/SimilarPage.vue'
)
const AlbumPage = () => import(
  '@/pages/album/MainPage.vue'
)
const TrackPage = () => import(
  '@/pages/track/MainPage.vue'
)
const TrackSimilarPage = () => import(
  '@/pages/track/SimilarPage.vue'
)
const TagPage = () => import(
  '@/pages/tag/MainPage.vue'
)
const TagArtistsPage = () => import(
  '@/pages/tag/ArtistsPage.vue'
)
const TagAlbumsPage = () => import(
  '@/pages/tag/AlbumsPage.vue'
)
const TagTracksPage = () => import(
  '@/pages/tag/TracksPage.vue'
)
const VideoChannelPage = () => import(
  '@/pages/videoChannel/MainPage.vue'
)
const VideoChannelVideosPage = () => import(
  '@/pages/videoChannel/VideosPage.vue'
)
const VideoChannelPlaylistsPage = () => import(
  '@/pages/videoChannel/PlaylistsPage.vue'
)
const VideoPage = () => import(
  '@/pages/video/MainPage.vue'
)
const VideoRelatedPage = () => import(
  '@/pages/video/RelatedPage.vue'
)
const VideoPlaylistPage = () => import(
  '@/pages/videoPlaylist/MainPage.vue'
)
const ProfilesPage = () => import(
  '@/pages/profiles/MainPage.vue'
)
const ProfilePage = () => import(
  '@/pages/profile/MainPage.vue'
)
const ProfileLibraryPage = () => import(
  '@/pages/profile/library/MainPage.vue'
)
const ProfileLibraryArtistsPage = () => import(
  '@/pages/profile/library/ArtistsPage.vue'
)
const ProfileLibraryArtistPage = () => import(
  '@/pages/profile/library/artist/MainPage.vue'
)
const ProfileLibraryArtistAlbumsPage = () => import(
  '@/pages/profile/library/artist/AlbumsPage.vue'
)
const ProfileLibraryArtistTracksPage = () => import(
  '@/pages/profile/library/artist/TracksPage.vue'
)
const ProfileLibraryArtistPlaylistsPage = () => import(
  '@/pages/profile/library/artist/PlaylistsPage.vue'
)
const ProfileLibraryAlbumsPage = () => import(
  '@/pages/profile/library/AlbumsPage.vue'
)
const ProfileLibraryAlbumPage = () => import(
  '@/pages/profile/library/album/MainPage.vue'
)
const ProfileLibraryAlbumTracksPage = () => import(
  '@/pages/profile/library/album/TracksPage.vue'
)
const ProfileLibraryAlbumPlaylistsPage = () => import(
  '@/pages/profile/library/album/PlaylistsPage.vue'
)
const ProfileLibraryTracksPage = () => import(
  '@/pages/profile/library/TracksPage.vue'
)
const ProfileLibraryTrackPage = () => import(
  '@/pages/profile/library/track/MainPage.vue'
)
const ProfileLibraryTrackAlbumsPage = () => import(
  '@/pages/profile/library/track/AlbumsPage.vue'
)
const ProfileLibraryTrackPlaylistsPage = () => import(
  '@/pages/profile/library/track/PlaylistsPage.vue'
)
const ProfileLibraryTagsPage = () => import(
  '@/pages/profile/library/TagsPage.vue'
)
const ProfileLibraryTagPage = () => import(
  '@/pages/profile/library/tag/MainPage.vue'
)
const ProfileLibraryTagArtistsPage = () => import(
  '@/pages/profile/library/tag/ArtistsPage.vue'
)
const RecommendationsPage = () => import(
  '@/pages/recommendations/MainPage.vue'
)
const BookmarksPage = () => import(
  '@/pages/bookmarks/MainPage.vue'
)
const BookmarksArtistsPage = () => import(
  '@/pages/bookmarks/ArtistsPage.vue'
)
const BookmarksAlbumsPage = () => import(
  '@/pages/bookmarks/AlbumsPage.vue'
)
const BookmarksTracksPage = () => import(
  '@/pages/bookmarks/TracksPage.vue'
)
const BookmarksVideosPage = () => import(
  '@/pages/bookmarks/VideosPage.vue'
)
const BookmarksVideoChannelsPage = () => import(
  '@/pages/bookmarks/VideoChannelsPage.vue'
)
const BookmarksVideoPlaylistsPage = () => import(
  '@/pages/bookmarks/VideoPlaylistsPage.vue'
)
const ProfileFavoritesPage = () => import(
  '@/pages/profile/favorites/MainPage.vue'
)
const ProfileFavoritesArtistsPage = () => import(
  '@/pages/profile/favorites/ArtistsPage.vue'
)
const ProfileFavoritesAlbumsPage = () => import(
  '@/pages/profile/favorites/AlbumsPage.vue'
)
const ProfileFavoritesTracksPage = () => import(
  '@/pages/profile/favorites/TracksPage.vue'
)
const ProfileFavoritesVideosPage = () => import(
  '@/pages/profile/favorites/VideosPage.vue'
)
const TopPage = () => import(
  '@/pages/top/MainPage.vue'
)
const TopArtistsPage = () => import(
  '@/pages/top/ArtistsPage.vue'
)
const TopAlbumsPage = () => import(
  '@/pages/top/AlbumsPage.vue'
)
const TopTracksPage = () => import(
  '@/pages/top/TracksPage.vue'
)
const TopTagsPage = () => import(
  '@/pages/top/TagsPage.vue'
)
const ProfilePlaylistsPage = () => import(
  '@/pages/profile/playlists/MainPage.vue'
)
const ProfilePlaylistPage = () => import(
  '@/pages/profile/playlist/MainPage.vue'
)
const RadioPage = () => import(
  '@/pages/radio/MainPage.vue'
)
const ProfilePostsPage = () => import(
  '@/pages/profile/posts/MainPage.vue'
)
const PlaylistsPage = () => import(
  '@/pages/playlists/MainPage.vue'
)
const ProfileCommunitiesPage = () => import(
  '@/pages/profile/communities/MainPage.vue'
)
const CommunitiesPage = () => import(
  '@/pages/communities/MainPage.vue'
)
const CommunityPage = () => import(
  '@/pages/community/MainPage.vue'
)
const CommunityPostsPage = () => import(
  '@/pages/community/PostsPage.vue'
)
const ReleasesPage = () => import(
  '@/pages/releases/MainPage.vue'
)
const ReleasesNewPage = () => import(
  '@/pages/releases/NewPage.vue'
)
const ReleasesUpcomingPage = () => import(
  '@/pages/releases/UpcomingPage.vue'
)
const MultitagPage = () => import(
  '@/pages/multitag/MainPage.vue'
)
const SavedTracksPage = () => import(
  '@/pages/savedTracks/MainPage.vue'
)
const AboutPage = () => import(
  '@/pages/about/MainPage.vue'
)
const HistoryPage = () => import(
  '@/pages/history/MainPage.vue'
)
const HistoryActivityPage = () => import(
  '@/pages/history/ActivityPage.vue'
)
const HistoryPlayerPage = () => import(
  '@/pages/history/PlayerPage.vue'
)
const HistoryBrowserPage = () => import(
  '@/pages/history/BrowserPage.vue'
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
        formatConversationPageLinkData
    }
  },
  {
    path: '/artists/:artistName',
    exact: true,
    name: 'ArtistPage',
    component: ArtistPage,
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
    name: 'AlbumPage',
    component: AlbumPage,
    props: true,
    meta: {
      formatter:
        formatAlbumPageLinkData
    }
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle',
    exact: true,
    name: 'TrackPage',
    component: TrackPage,
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
    name: 'TagPage',
    component: TagPage,
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
    name: 'VideoChannelPage',
    component: VideoChannelPage,
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
    name: 'VideoPage',
    component: VideoPage,
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
    name: 'VideoPlaylistPage',
    component: VideoPlaylistPage,
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
    name: 'ProfilePage',
    component: ProfilePage,
    props: true,
    meta: {
      formatter:
        formatProfilePageLinkData
    }
  },
  {
    path: '/profiles/:profileId/library',
    exact: true,
    name: 'ProfileLibraryPage',
    component: ProfileLibraryPage,
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
    name: 'ProfileLibraryArtistPage',
    component: ProfileLibraryArtistPage,
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
    name: 'ProfileLibraryAlbumPage',
    component: ProfileLibraryAlbumPage,
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
    name: 'ProfileLibraryTrackPage',
    component: ProfileLibraryTrackPage,
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
    name: 'ProfileLibraryTagPage',
    component: ProfileLibraryTagPage,
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
    name: 'BookmarksPage',
    component: BookmarksPage,
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
    path: '/bookmarks/video_channels',
    exact: true,
    name: 'BookmarksVideoChannelsPage',
    component: BookmarksVideoChannelsPage,
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
    name: 'ProfileFavoritesPage',
    component: ProfileFavoritesPage,
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
    name: 'TopPage',
    component: TopPage,
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
    name: 'CommunityPage',
    component: CommunityPage,
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
    name: 'ReleasesPage',
    component: ReleasesPage,
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
    name: 'HistoryPage',
    component: HistoryPage,
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
