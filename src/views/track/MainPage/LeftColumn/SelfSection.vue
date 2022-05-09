<template>
  <div class="main-self-container">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseOptionsDropdown
      model="track"
      :track-title="trackTitle"
      :artist-name="artistName"
      :album-title="albumTitle"
      :image-url="imageData?.original"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-playlist-option
      @playlist-option-click="handlePlaylistOptionClick"
    />
  </div>

  <BasePlaylistsModal
    ref="playlistsModal"
    :track-title="trackTitle"
    :artist-name="artistName"
    :album-title="albumTitle"
    :image-url="imageData?.original"
  />
</template>

<script>
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseOptionsDropdown,
    BasePlaylistsModal
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  },
  computed: {
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
    }
  },
  methods: {
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
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
