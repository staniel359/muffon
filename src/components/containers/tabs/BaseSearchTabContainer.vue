<template>
  <div
    ref="tab"
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedListContainer
      :isLoading="isLoading"
      :error="error"
      :responseData="searchData"
      :scope="tabData.scope"
      :clientPageLimit="tabData.clientPageLimit"
      :responsePageLimit="tabData.responsePageLimit"
      :isPaginationSimple="isVideos"
      :isReset="isVideos"
      @fetchData="fetchData"
      @focus="handleFocus"
      @refresh="handleRefresh"
    >
      <template #default="slotProps">
        <Component
          :is="tabData.component"
          :[tabData.scope]="slotProps[tabData.scope]"
          :isWithListenersCount="!!tabData.isWithListenersCount"
          :profileId="profileId"
          :isWithPlaylistOption="isTracks"
          isWithImage
          isWithArtistName
          isWithAlbumTitle
          isWithDuration
          isWithSource
          isWithLibraryOption
          isWithListenedOption
          isWithBookmarkOption
          isWithChannelTitle
          isWithFavoriteOption
          @linkClick="handleLinkClick"
        />
      </template>
    </BasePaginatedListContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
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
  name: 'BaseSearchTabContainer',
  components: {
    BasePaginatedListContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList,
    BaseTagsList,
    BaseVideosSimpleList
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
    searchArgs () {
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
    isTracks () {
      return (
        this.tabData.scope ===
          'tracks'
      )
    },
    isVideos () {
      return (
        this.tabData.scope ===
          'videos'
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
      if (value) {
        this.isActivated = true
      }
    },
    handleIsActivated (value) {
      if (value) {
        this.fetchData()
      }
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
    getSearch,
    fetchData (page) {
      this.getSearch({
        ...this.searchArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
