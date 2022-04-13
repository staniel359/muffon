<template>
  <BaseModalContainer ref="modal">
    <BaseSegmentContainer
      :class="[
        'scrolling content',
        'main-modal-content-full-height',
        'main-segment-container'
      ]"
      :is-loading="isLoading"
      @init="handleInit"
    >
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
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleSelectableList
  from '*/components/lists/playlists/BasePlaylistsSimpleSelectableList.vue'
import getProfilePlaylists from '*/helpers/actions/api/profile/get'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BaseModalContainer,
    BaseSegmentContainer,
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
      error: null,
      scrollable: null,
      profileData: null,
      isLoading: false,
      isOpen: false,
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
    playlistsArgs () {
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
  watch: {
    isOpen: 'handleIsOpenChange'
  },
  methods: {
    handleInit (
      element
    ) {
      this.scrollable = element
    },
    handleIsOpenChange (
      value
    ) {
      if (value) {
        this.fetchData()
      }
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollable.scrollTo(
        0,
        0
      )
    },
    getProfilePlaylists,
    fetchData (
      page
    ) {
      this.getProfilePlaylists(
        {
          ...this.playlistsArgs,
          page
        }
      )
    },
    show () {
      this.$refs
        .modal
        .show()

      this.isOpen = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
