<template>
  <div
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedListContainer
      :responseData="libraryData"
      :scope="tabData.scope"
      :limit="tabData.limit"
      :isLoading="isLoading"
      :error="error"
      @fetchData="fetchData"
      @refresh="handleRefresh"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <Component
          :is="tabData.component"
          :[tabData.scope]="slotProps[tabData.scope]"
          :itemsInRow="tabData.itemsInRow"
          :profileId="profileId"
          :isWithPlaylistOption="isWithPlaylistOption"
          :isWithFavoriteOption="isWithFavoriteOption"
          :isWithDeleteOption="isWithDeleteOption(tabData.scope)"
          isWithImage
          isWithArtistName
          isWithAlbumTitle
          isWithCreated
          isWithLibrary
          isLinkToLibrary
        />
      </template>
    </BasePaginatedListContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import getProfileLibrary from '*/helpers/actions/api/profile/library/get'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'BaseProfileLibraryTabContainer',
  components: {
    BasePaginatedListContainer,
    BaseArtistsTableList,
    BaseAlbumsTableList,
    BaseTracksSimpleList,
    BaseTagsList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
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
    libraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.tabData.scope,
        limit: this.tabData.limit
      }
    },
    libraryData () {
      return this.profileData?.library
    },
    isWithPlaylistOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
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
      this.$emit('focus')
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    getProfileLibrary,
    fetchData (page) {
      this.getProfileLibrary({
        ...this.libraryArgs,
        page
      })
    },
    isWithDeleteOption (scope) {
      return (
        scope === 'tracks' &&
          isCurrentProfile(
            this.profileId
          )
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
