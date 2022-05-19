<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
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
  mapGetters
} from 'vuex'
import BasePaginatedSegmentModalContainer
  from '*/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BasePlaylistsSimpleSelectableList
  from '*/components/lists/playlists/BasePlaylistsSimpleSelectableList.vue'
import getProfilePlaylists from '*/helpers/actions/api/profile/get'
import modalMixin from '*/mixins/modalMixin'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BasePlaylistsSimpleSelectableList
  },
  mixins: [
    modalMixin
  ],
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
      limit: 50,
      scope: 'playlists'
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
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
    }
  },
  methods: {
    getProfilePlaylists,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfilePlaylists(
        {
          ...this.profilePlaylistsArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
