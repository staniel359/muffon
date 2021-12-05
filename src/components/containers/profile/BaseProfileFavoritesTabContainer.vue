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
      :responseData="favoritesData"
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
          :profileId="profileId"
          :isWithPlaylistOption="isWithPlaylistOption"
          :isWithDeleteOption="isWithDeleteOption"
          isWithImage
          isWithArtistName
          isWithAlbumTitle
          isFavorite
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
import fetchFavoritesData from '#/actions/api/profile/favorites/fetchData'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'BaseProfileFavoritesTabContainer',
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
    isActive: Boolean,
    profileId: String
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
    favoritesDataArgs () {
      return {
        profileId: this.profileId,
        scope: this.tabData.scope,
        limit: this.tabData.responsePageLimit
      }
    },
    favoritesData () {
      return this.profileData?.favorites
    },
    isWithPlaylistOption () {
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
      this.fetchData(page)
    },
    fetchFavoritesData,
    fetchData (page) {
      this.fetchFavoritesData({
        ...this.favoritesDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
