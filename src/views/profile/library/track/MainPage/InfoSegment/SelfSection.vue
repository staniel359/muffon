<template>
  <div
    v-if="favoriteId || isSelf"
    class="main-self-container"
  >
    <BaseSelfIcons
      :favorite-id="favoriteId"
    />

    <template
      v-if="isSelf"
    >
      <BaseTrackOptionsDropdown
        :track-data="trackData"
        :track-title="trackTitle"
        :artist-name="artistName"
        :album-title="albumTitle"
        :image-url="imageData?.large"
        :favorite-id="favoriteId"
        is-with-favorite-option
        is-with-playlist-option
        is-with-queue-option
        is-with-delete-option
        @playlist-option-click="handlePlaylistOptionClick"
        @delete-option-click="handleDeleteOptionClick"
      />

      <BasePlaylistsModal
        ref="playlistsModal"
        :track-data="trackData"
      />

      <BaseLibraryDeleteModal
        ref="deleteModal"
        model="track"
        :profile-id="profileId"
        :model-id="libraryTrackId"
        :model-name="trackFullTitle"
        is-delete-with-redirect
      />
    </template>
  </div>
</template>

<script>
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseTrackOptionsDropdown
  from '*/components/dropdowns/track/BaseTrackOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import BaseLibraryDeleteModal
  from '*/components/modals/library/BaseLibraryDeleteModal.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseTrackOptionsDropdown,
    BasePlaylistsModal,
    BaseLibraryDeleteModal
  },
  provide () {
    return {
      setFavoriteId: this.setFavoriteId
    }
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      favoriteId: null
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.trackData.album?.title
    },
    imageData () {
      return this.trackData.image
    },
    libraryTrackId () {
      return this.trackData.library.id.toString()
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    }
  },
  mounted () {
    this.favoriteId =
      this.trackData.favorite_id?.toString()
  },
  methods: {
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
