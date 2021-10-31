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
      :responseData="libraryData"
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
          :itemsInRow="tabData.itemsInRow"
          :profileId="profileId"
          :isWithFavoriteOption="isWithFavoriteOption"
          :isWithDeleteOption="isWithDeleteOption"
          isWithImage
          isWithArtistName
          isWithAlbumTitle
          isWithTracksCount
          isWithAlbumsCount
          isWithCreated
          isLinkToLibrary
        />
      </template>
    </BasePaginatedContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import fetchLibraryData from '#/actions/api/profile/library/fetchData'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'BaseProfileLibraryTabContainer',
  components: {
    BasePaginatedContainer,
    BaseArtistsTableList,
    BaseAlbumsTableList,
    BaseTracksSimpleList
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
    libraryDataArgs () {
      return {
        profileId: this.profileId,
        scope: this.tabData.scope,
        limit: this.tabData.responsePageLimit
      }
    },
    libraryData () {
      return this.profileData?.library
    },
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithDeleteOption () {
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
      this.error = null

      this.fetchData(page)
    },
    fetchLibraryData,
    fetchData (page) {
      this.fetchLibraryData({
        ...this.libraryDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
