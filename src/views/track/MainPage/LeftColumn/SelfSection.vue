<template>
  <div class="main-self-container">
    <BaseSelfIcons
      class="track-self-icons"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseTrackOptionsDropdown
      :track-data="trackData"
      :track-title="trackTitle"
      :artist-name="artistName"
      :album-title="albumTitle"
      :image-url="imageData?.large"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :share-data="shareData"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-playlist-option
      is-with-share-option
      is-with-queue-option
      @playlist-option-click="handlePlaylistOptionClick"
    />
  </div>

  <BasePlaylistsModal
    ref="playlistsModal"
    :track-data="trackData"
  />
</template>

<script>
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseTrackOptionsDropdown
  from '*/components/dropdowns/track/BaseTrackOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import {
  track as formatTrackShareData
} from '*/helpers/formatters/share'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseTrackOptionsDropdown,
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
    },
    shareData () {
      return formatTrackShareData(
        this.trackData
      )
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

<style lang="sass" scoped>
.track-self-icons
  @extend .text-align-center
  max-width: 75px
</style>
