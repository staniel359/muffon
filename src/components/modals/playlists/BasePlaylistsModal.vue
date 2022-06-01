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
        :track-data="trackData"
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
    trackData: Object
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
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
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
