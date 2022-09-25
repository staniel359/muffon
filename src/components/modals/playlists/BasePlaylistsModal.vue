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
      <BasePlaylistsSelectableList
        :playlists="slotProps[scope]"
        :tracks="tracks"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BasePlaylistsSelectableList
  from '@/components/lists/playlists/BasePlaylistsSelectableList.vue'
import getProfilePlaylists from '@/helpers/actions/api/profile/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BasePlaylistsSelectableList
  },
  mixins: [
    modalMixin
  ],
  props: {
    model: String,
    modelData: Object,
    tracks: Array
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
        playlistsModelData:
          this.playlistsModelDataConditional
      }
    },
    playlistsModelDataConditional () {
      if (this.isModel) {
        return this.playlistsModelData
      } else {
        return null
      }
    },
    isModel () {
      return (
        this.model &&
          this.modelData
      )
    },
    playlistsModelData () {
      return {
        model: this.model,
        title: this.modelTitle,
        artistName:
          this.modelArtistName
      }
    },
    modelTitle () {
      return this.modelData.title
    },
    modelArtistName () {
      return this.modelData.artist.name
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
