<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    is-multiple
    @call="handleCall"
  >
    <template #top>
      <BasePlaylistCreateButton
        :key="key"
        @success="handlePlaylistCreate"
      />

      <BaseDivider />
    </template>

    <template
      #default="slotProps"
    >
      <BasePlaylistsSelectableList
        :playlists="slotProps[scope]"
        :tracks="tracks"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BasePlaylistCreateButton
  from '@/components/buttons/playlist/BasePlaylistCreateButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BasePlaylistsSelectableList
  from '@/components/lists/playlists/BasePlaylistsSelectableList.vue'
import getProfilePlaylists from '@/helpers/actions/api/profile/get'
import modalMixin from '@/mixins/modalMixin'
import {
  generateKey
} from '@/helpers/utils'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BasePlaylistCreateButton,
    BaseDivider,
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
      key: null,
      profileData: null,
      error: null,
      isLoading: false,
      limit:
        playlistsLimits.simple.large,
      scope: 'playlists'
    }
  },
  computed: {
    ...mapState(
      profileStore,
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
    handlePlaylistCreate () {
      this.resetForm()

      this.refresh()
    },
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
    },
    resetForm () {
      this.key = generateKey()
    },
    refresh () {
      this.$refs
        .modal
        .refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
