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
import getFavorites from '#/actions/api/favorites/get'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'BaseProfileFavoriteTabContainer',
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
    favoritesArgs () {
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
    getFavorites,
    fetchData (page) {
      this.getFavorites({
        ...this.favoritesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
