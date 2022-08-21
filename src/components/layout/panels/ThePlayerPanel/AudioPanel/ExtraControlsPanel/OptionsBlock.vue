<template>
  <BaseTrackOptionsDropdown
    :track-data="playerPlaying"
    :library-id="libraryId"
    :favorite-id="favoriteId"
    :bookmark-id="bookmarkId"
    :listened-id="listenedId"
    is-with-library-option
    is-with-favorite-option
    is-with-bookmark-option
    is-with-listened-option
    is-with-playlist-option
    is-with-queue-option
    is-with-save-option
    is-with-share-option
    @playlist-option-click="handlePlaylistOptionClick"
  />

  <BasePlaylistsModal
    ref="playlistsModal"
    :track-data="playerPlaying"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseTrackOptionsDropdown
  from '*/components/dropdowns/track/BaseTrackOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'OptionsBlock',
  components: {
    BaseTrackOptionsDropdown,
    BasePlaylistsModal
  },
  mixins: [
    selfMixin
  ],
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    modelData () {
      return this.playerPlaying
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
