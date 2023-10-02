<template>
  <div class="ui container main-container the-search-results-panel">
    <div
      class="results-container fixed top-navbar"
      :class="{
        'full-size': isFullSize
      }"
    >
      <BasePaginatedSegmentContainer
        ref="segment"
        class="raised results-segment main-segment-container overflow-y-auto flex-column height-100"
        :response-data="searchData"
        :is-loading="isLoading"
        :error="error"
        :scope="searchScope"
        :text-scope="scope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        :is-pagination-simple="isPaginationSimple"
        :is-with-infinite-scroll="isWithInfiniteScroll"
        :scrollable="scrollable"
        :is-change-transparency="false"
        @focus="handleFocus"
      >
        <template
          #default="slotProps"
        >
          <Component
            :is="component"
            :[listScope]="slotProps[searchScope]"
            :scope="searchScope"
            :is-with-artist-image="isLastfmSource"
            :is-with-image="!isLastfmSource"
            :is-with-listeners-count="isWithListenersCount"
            :is-with-source="isWithSource"
            :scrollable="scrollable"
            is-with-artist-name
            is-with-album-title
            is-with-channel-title
            is-with-duration
            is-with-library-option
            is-with-playlist-option
            is-with-favorite-option
            is-with-bookmark-option
            is-with-listened-option
            is-with-watched-option
            is-with-queue-option
            is-with-save-option
            is-with-share-option
            is-with-external-link-option
            is-segment
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedSegmentContainer>

      <FullSizeToggleButton
        :is-full-size="isFullSize"
        @click="handleFullSizeButtonClick"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import BaseLyricsSimpleList
  from '@/components/lists/lyrics/BaseLyricsSimpleList.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import BaseVideoChannelsSimpleList
  from '@/components/lists/videoChannels/BaseVideoChannelsSimpleList.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import FullSizeToggleButton from './ResultsPanel/FullSizeToggleButton.vue'
import getSearch from '@/helpers/actions/api/search/get'
import {
  artists as artistsLimits,
  albums as albumsLimits,
  tracks as tracksLimits,
  tags as tagsLimits,
  lyrics as lyricsLimits,
  videos as videosLimits,
  videoChannels as videoChannelsLimits,
  videoPlaylists as videoPlaylistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ResultsPanel',
  components: {
    BasePaginatedSegmentContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList,
    BaseTagsSimpleList,
    BaseLyricsSimpleList,
    BaseVideosSimpleList,
    BaseVideoChannelsSimpleList,
    BaseVideoPlaylistsSimpleList,
    FullSizeToggleButton
  },
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    query: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    isFullSize: Boolean
  },
  emits: [
    'fullSizeButtonClick'
  ],
  data () {
    return {
      scrollable: null,
      searchData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInfiniteScroll'
      ]
    ),
    searchArgs () {
      return {
        query: this.query,
        source: this.source,
        scope: this.searchScope,
        limit: this.limit,
        isWithSelfData: true
      }
    },
    searchScope () {
      return (
        this.scopeData.searchScope ||
          this.scope
      )
    },
    scopeData () {
      return this.scopesData[
        this.scope
      ]
    },
    scopesData () {
      return {
        artists: this.artistsData,
        albums: this.albumsData,
        albumGroups:
          this.albumGroupsData,
        tracks: this.tracksData,
        tags: this.tagsData,
        lyrics: this.lyricsData,
        videos: this.videosData,
        videoChannels:
          this.videoChannelsData,
        videoMixes:
          this.videoMixesData,
        videoPlaylists:
          this.videoPlaylistsData
      }
    },
    artistsData () {
      return {
        component:
          'BaseArtistsSimpleList',
        limit:
          artistsLimits.simple.medium,
        responsePageLimit:
          this.artistsResponsePageLimit,
        isWithListenersCount: true
      }
    },
    artistsResponsePageLimit () {
      switch (this.source) {
        case 'yandexmusic':
          return 10
        default:
          return null
      }
    },
    albumsData () {
      return {
        component:
          'BaseAlbumsSimpleList',
        limit:
          albumsLimits.simple.medium,
        responsePageLimit:
          this.albumsResponsePageLimit,
        isWithListenersCount: true
      }
    },
    albumsResponsePageLimit () {
      switch (this.source) {
        case 'yandexmusic':
          return 10
        default:
          return null
      }
    },
    albumGroupsData () {
      return {
        component:
          'BaseAlbumsSimpleList',
        searchScope: 'groups',
        listScope: 'albums',
        limit:
          albumsLimits.simple.medium,
        isWithListenersCount: true
      }
    },
    tracksData () {
      return {
        component:
          this.tracksComponent,
        listScope:
          this.tracksListScope,
        limit: this.tracksLimit,
        responsePageLimit:
          this.tracksResponsePageLimit
      }
    },
    tracksComponent () {
      switch (this.source) {
        case 'youtubemusic':
          return 'BaseVideosSimpleList'
        default:
          return 'BaseTracksSimpleList'
      }
    },
    tracksListScope () {
      switch (this.source) {
        case 'youtubemusic':
          return 'videos'
        default:
          return 'tracks'
      }
    },
    tracksLimit () {
      switch (this.source) {
        case 'youtubemusic':
          return videosLimits.simple.medium
        default:
          return tracksLimits.simple.medium
      }
    },
    tracksResponsePageLimit () {
      switch (this.source) {
        case 'yandexmusic':
          return 20
        case 'genius':
          return 20
        case 'youtubemusic':
          return 20
        default:
          return null
      }
    },
    tagsData () {
      return {
        component:
          'BaseTagsSimpleList',
        limit:
          tagsLimits.simple.small,
        responsePageLimit: 10
      }
    },
    lyricsData () {
      return {
        component:
          'BaseLyricsSimpleList',
        searchScope: 'tracks',
        limit:
          lyricsLimits.simple.medium,
        responsePageLimit: 20
      }
    },
    videosData () {
      return {
        component:
          'BaseVideosSimpleList',
        limit:
          videosLimits.simple.medium
      }
    },
    videoChannelsData () {
      return {
        component:
          'BaseVideoChannelsSimpleList',
        searchScope: 'channels',
        listScope: 'channels',
        limit:
          videoChannelsLimits.simple.medium
      }
    },
    videoMixesData () {
      return {
        component:
          'BaseVideoPlaylistsSimpleList',
        searchScope: 'mixes',
        listScope: 'playlists',
        limit:
          videoPlaylistsLimits.simple.medium
      }
    },
    videoPlaylistsData () {
      return {
        component:
          'BaseVideoPlaylistsSimpleList',
        searchScope: 'playlists',
        listScope: 'playlists',
        limit:
          videoPlaylistsLimits.simple.medium
      }
    },
    limit () {
      return this.scopeData.limit
    },
    responsePageLimit () {
      return this.scopeData.responsePageLimit
    },
    isPaginationSimple () {
      return (
        this.isYouTubeSource ||
          this.isYouTubeMusicSource
      )
    },
    isYouTubeSource () {
      return (
        this.source === 'youtube'
      )
    },
    isYouTubeMusicSource () {
      return (
        this.source === 'youtubemusic'
      )
    },
    component () {
      return this.scopeData.component
    },
    listScope () {
      return (
        this.scopeData.listScope ||
          this.scope
      )
    },
    isWithListenersCount () {
      return !!this.scopeData.isWithListenersCount
    },
    isWithSource () {
      return (
        this.isTracks ||
          this.isAlbums
      )
    },
    isTracks () {
      return (
        this.scope === 'tracks'
      )
    },
    isAlbums () {
      return (
        this.scope === 'albums'
      )
    },
    isLastfmSource () {
      return (
        this.source === 'lastfm'
      )
    }
  },
  mounted () {
    this.getData()

    this.scrollable =
      this.$refs.segment.$el
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setIsSearchPanelVisible'
      ]
    ),
    getSearch,
    handleFocus () {
      this.$refs
        .segment
        .scrollToTop()
    },
    handleLinkClick () {
      this.hideSearch()
    },
    handleFullSizeButtonClick () {
      this.$emit(
        'fullSizeButtonClick'
      )
    },
    hideSearch () {
      this.setIsSearchPanelVisible(
        false
      )
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getSearch(
        {
          ...this.searchArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
