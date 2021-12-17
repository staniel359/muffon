<template>
  <div
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedListContainer
      :isLoading="isLoading"
      :error="error"
      :responseData="bookmarksData"
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
          isWithImage
          isWithArtistName
          isWithAlbumTitle
          isBookmark
          isWithDeleteOption
        />
      </template>
    </BasePaginatedListContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import getBookmarks from '#/actions/api/bookmarks/get'

export default {
  name: 'BaseBookmarksTabContainer',
  components: {
    BasePaginatedListContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList
  },
  props: {
    tabData: {
      type: Object,
      required: true
    },
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      error: null,
      profileData: null,
      isActivated: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    bookmarksArgs () {
      return {
        scope: this.tabData.scope,
        limit: this.tabData.responsePageLimit
      }
    },
    bookmarksData () {
      return this.profileData?.bookmarks
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
      this.$emit('focus')
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    getBookmarks,
    fetchData (page) {
      this.getBookmarks({
        ...this.bookmarksArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
