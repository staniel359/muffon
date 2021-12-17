<template>
  <div class="main-self-container">
    <BaseSelfIcons
      :libraryId="libraryId"
      :favoriteId="favoriteId"
      :bookmarkId="bookmarkId"
      :listenedId="listenedId"
    />

    <BaseOptionsDropdown
      model="track"
      :trackTitle="trackTitle"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :imageUrl="imageData?.original"
      :libraryId="libraryId"
      :favoriteId="favoriteId"
      :bookmarkId="bookmarkId"
      :listenedId="listenedId"
      isWithLibraryOption
      isWithFavoriteOption
      isWithBookmarkOption
      isWithListenedOption
      isWithPlaylistOption
      @playlist="handlePlaylistOptionClick"
    />
  </div>

  <BasePlaylistsModal
    ref="playlistModal"
    :trackTitle="trackTitle"
    :artistName="artistName"
    :albumTitle="albumTitle"
    :imageUrl="imageData?.original"
  />
</template>

<script>
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistsModal from '@/modals/playlists/BasePlaylistsModal.vue'

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
      this.$refs.playlistModal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
