<template>
  <div
    ref="tab"
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <template v-if="isRenderVideos">
      <div
        v-show="!isLoading"
        class="videos-list-container-wrapper"
      >
        <div class="videos-list-container">
          <BaseVideosPaginatedList
            :videosData="searchData"
            :error="error"
            @prevPageButtonClick="fetchData"
            @nextPageButtonClick="fetchData"
            @focus="handleFocus"
            @refresh="handleRefresh"
            @linkClick="handleLinkClick"
          />
        </div>
      </div>
    </template>
    <BasePaginatedContainer
      v-else
      :isLoading="isLoading"
      :error="error"
      :responseData="searchData"
      :scope="tabData.scope"
      :clientPageLimit="tabData.clientPageLimit"
      :responsePageLimit="tabData.responsePageLimit"
      @fetchData="fetchData"
      @focus="handleFocus"
      @refresh="handleRefresh"
    >
      <template #default="slotProps">
        <Component
          :is="tabData.component"
          :[tabData.scope]="slotProps[tabData.scope]"
          :isWithListenersCount="!!tabData.isWithListenersCount"
          :isWithIcon="!!tabData.isWithIcon"
          :profileId="profileId"
          :isWithPlaylistOption="isWithPlaylistOption"
          isWithImage
          isWithArtistName
          isWithAlbumTitle
          isWithSource
          isWithLibraryOption
          isWithListenedOption
          isWithBookmarkOption
          isWithFavoriteOption
          @linkClick="handleLinkClick"
        />
      </template>
    </BasePaginatedContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseVideosPaginatedList
  from '@/lists/videos/BaseVideosPaginatedList.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import fetchSearchData from '#/actions/api/search/fetchData'

export default {
  name: 'BaseSearchTabContainer',
  components: {
    BaseVideosPaginatedList,
    BasePaginatedContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList,
    BaseTagsList
  },
  inject: [
    'hideSearch'
  ],
  props: {
    sourceId: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    tabData: {
      type: Object,
      required: true
    },
    isActive: Boolean
  },
  data () {
    return {
      searchData: null,
      error: null,
      isActivated: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    searchDataArgs () {
      return {
        sourceId: this.sourceId,
        query: this.query,
        scope: this.tabData.scope,
        limit: this.tabData.responsePageLimit,
        isWithSelfData: true
      }
    },
    profileId () {
      return this.profileInfo.id.toString()
    },
    isWithPlaylistOption () {
      return this.tabData.scope === 'tracks'
    },
    isRenderVideos () {
      return (
        this.tabData.scope === 'videos' &&
          !!this.searchData
      )
    }
  },
  watch: {
    isActive: {
      immediate: true,
      handler: 'handleIsActive'
    },
    isActivated: {
      immediate: true,
      handler: 'handleIsActivated'
    }
  },
  methods: {
    handleIsActive (value) {
      value && (this.isActivated = true)
    },
    handleIsActivated (value) {
      value && this.fetchData()
    },
    handleFocus () {
      this.$refs.tab.scrollTo(0, 0)
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleLinkClick () {
      this.hideSearch()
    },
    fetchSearchData,
    fetchData (page) {
      this.fetchSearchData({
        ...this.searchDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.videos-list-container-wrapper
  @extend .w-100

.videos-list-container
  @extend .d-flex, .flex-column
</style>
