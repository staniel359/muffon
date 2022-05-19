<template>
  <div
    ref="section"
    :class="[
      'search-segments-container',
      'main-basic-segments-container'
    ]"
  >
    <div
      :class="[
        'ui basic segments',
        'search-segment-container'
      ]"
    >
      <BasePaginatedSegmentContainer
        :class="[
          'search-segment',
          'main-paginated-segment-container'
        ]"
        :response-data="searchData"
        :is-loading="isLoading"
        :error="error"
        :scope="searchScope"
        :limit="limit"
        :response-page-limit="responsePageLimit"
        :is-pagination-simple="isVideos"
        :is-reset="isVideos"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <Component
            :is="component"
            :[listScope]="slotProps[searchScope]"
            :is-with-listeners-count="isWithListenersCount"
            :is-with-source="isTracks"
            :is-with-playlist-option="isTracks"
            is-with-image
            is-with-artist-name
            is-with-album-title
            is-with-duration
            is-with-library-option
            is-with-listened-option
            is-with-bookmark-option
            is-with-channel-title
            is-with-favorite-option
            is-with-share-option
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </div>
  </div>
</template>

<script>
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import BaseVideosSimpleList
  from '*/components/lists/videos/BaseVideosSimpleList.vue'
import getSearch from '*/helpers/actions/api/search/get'

export default {
  name: 'SearchSection',
  components: {
    BasePaginatedSegmentContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList,
    BaseTagsList,
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
        case 'bandcamp':
          return 10
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
        case 'bandcamp':
          return 10
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
        component: 'BaseTracksSimpleList',
        limit: 50,
        responsePageLimit:
          this.tracksResponsePageLimit
      }
    },
    tracksResponsePageLimit () {
      switch (this.source) {
        case 'bandcamp':
          return 10
        case 'yandexmusic':
          return 20
        case 'genius':
          return 20
        default:
          return null
      }
    },
    tagsData () {
      return {
        component: 'BaseTagsList',
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
    isVideos () {
      return this.scope === 'videos'
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
    isTracks () {
      return this.scope === 'tracks'
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
