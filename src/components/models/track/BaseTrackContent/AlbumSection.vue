<template>
  <div class="description">
    <small>
      <BaseAlbumLinkContainer
        class="main-link"
        :album-data="albumData"
        :artist-name="artistName"
        :is-link-to-library="isLinkToLibrary"
        :profile-id="profileId"
        :library-album-id="libraryAlbumId"
        @click="handleLinkClick"
      >
        {{ albumTitle }}
      </BaseAlbumLinkContainer>
    </small>
  </div>
</template>

<script>
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'

export default {
  name: 'AlbumSection',
  components: {
    BaseAlbumLinkContainer
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return this.trackData.artist.name
    },
    libraryAlbumId () {
      return this.trackData.library?.album?.id?.toString()
    },
    albumTitle () {
      return this.albumData.title
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
