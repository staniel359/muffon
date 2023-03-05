<template>
  <div
    ref="section"
    :class="[
      'search-segments-container',
      'main-basic-segments-container'
    ]"
  >
    <div class="ui basic segments search-segment-container">
      <BasePaginatedSegmentContainer
        class="search-segment main-paginated-segment-container"
        :response-data="searchData"
        :is-loading="isLoading"
        :error="error"
        :scope="searchScope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        :is-pagination-simple="isPaginationSimple"
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
            is-with-share-option
            is-with-queue-option
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </div>
  </div>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import getSearch from '@/helpers/actions/api/search/get'

export default {
  name: 'ResultsSection',
  components: {
    BasePaginatedSegmentContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList,
    BaseTagsSimpleList,
    BaseVideosSimpleList
  },
  provide () {
    return {
      getData: this.getData
    }
  },
  inject: [
    'hideSearch'
  ],
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
    }
  },
  data () {
    return {
      searchData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
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
        albumGroups: this.albumGroupsData,
        tracks: this.tracksData,
        tags: this.tagsData,
        videos: this.videosData
      }
    },
    artistsData () {
      return {
        component: 'BaseArtistsSimpleList',
        limit: 20,
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
        component: 'BaseAlbumsSimpleList',
        limit: 20,
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
        component: 'BaseAlbumsSimpleList',
        searchScope: 'groups',
        listScope: 'albums',
        limit: 20,
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
          return 20
        default:
          return 50
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
        component: 'BaseTagsSimpleList',
        limit: 20,
        responsePageLimit: 10
      }
    },
    videosData () {
      return {
        component: 'BaseVideosSimpleList',
        limit: 20
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
  },
  methods: {
    getSearch,
    handleFocus () {
      this.$refs
        .section
        .scrollTo(
          0,
          0
        )
    },
    handleLinkClick () {
      this.hideSearch()
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

<style lang="sass" scoped>
.search-segments-container
  @extend .overflow-y-auto, .d-flex, .flex-full, .scroll-smooth

.search-segment-container
  @extend .d-flex, .flex-full

.search-segment
  @extend .flex-full
</style>
