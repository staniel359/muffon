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
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import getProfileFavorites from '*/helpers/actions/api/profile/favorites/get'
import { isCurrentProfile } from '*/helpers/utils'

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
    getProfileFavorites,
    fetchData (page) {
      this.getProfileFavorites({
        ...this.favoritesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
