<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    response-data-name="profileData"
    :slot-props-data="slotPropsData"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
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
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BasePaginatedSegmentModalContainer
  from '*/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BasePlaylistsSimpleSelectableList
  from '*/components/lists/playlists/BasePlaylistsSimpleSelectableList.vue'
import getProfilePlaylists from '*/helpers/actions/api/profile/get'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BasePaginatedSegmentModalContainer,
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
    },
    slotPropsData () {
      return {
        profileData: this.profileData,
        isLoading: this.isLoading,
        error: this.error,
        fetchData: this.fetchData,
        refresh: this.refresh
      }
    }
  },
  methods: {
    getProfilePlaylists,
    handleCall () {
      this.fetchData()
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
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
