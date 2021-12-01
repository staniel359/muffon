<template>
  <div
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedContainer
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
    </BasePaginatedContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import fetchBookmarksData from '#/actions/api/profile/bookmarks/fetchData'

export default {
  name: 'BaseBookmarksTabContainer',
  components: {
    BasePaginatedContainer,
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
    bookmarksDataArgs () {
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
      value && (
        this.isActivated = true
      )
    },
    handleIsActivated (value) {
      value && this.fetchData()
    },
    handleFocus () {
      this.$emit('focus')
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchBookmarksData,
    fetchData (page) {
      this.fetchBookmarksData({
        ...this.bookmarksDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
