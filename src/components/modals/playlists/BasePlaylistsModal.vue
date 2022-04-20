<template>
  <BaseModalContentContainer
    ref="modal"
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <template #default>
      <BasePaginatedListContainer
        :response-data="profileData"
        :scope="scope"
        :limit="limit"
        :is-loading="isLoading"
        :error="error"
        @fetch-data="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BasePlaylistsSimpleSelectableList
            :playlists="slotProps[scope]"
            :track-title="trackTitle"
            :artist-name="artistName"
            :album-title="albumTitle"
            :image-url="imageUrl"
          />
        </template>
      </BasePaginatedListContainer>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleSelectableList
  from '*/components/lists/playlists/BasePlaylistsSimpleSelectableList.vue'
import getProfilePlaylists from '*/helpers/actions/api/profile/get'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BaseModalContentContainer,
    BasePaginatedListContainer,
    BasePlaylistsSimpleSelectableList
  },
  props: {
    trackTitle: String,
    artistName: String,
    albumTitle: String,
    imageUrl: String
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      limit: 20,
      scope: 'playlists'
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    profilePlaylistsArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit,
        trackTitle: this.trackTitle,
        artistName: this.artistName
      }
    },
    profileId () {
      return this.profileInfo.id.toString()
    }
  },
  methods: {
    getProfilePlaylists,
    handleCall () {
      this.fetchData()
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollToTop()
    },
    fetchData (
      page
    ) {
      this.getProfilePlaylists(
        {
          ...this.profilePlaylistsArgs,
          page
        }
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    scrollToTop () {
      this.$refs
        .modal
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
