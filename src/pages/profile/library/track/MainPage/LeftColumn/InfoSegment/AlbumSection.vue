<template>
  <div
    v-if="albumData"
    class="main-small-album-title"
  >
    <small>
      <BaseAlbumLinkContainer
        class="main-link"
        :album-data="albumData"
        :profile-id="profileId"
        :library-album-id="libraryAlbumId"
        is-link-to-library
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
    profileId: String
  },
  computed: {
    albumData () {
      return this.trackData.album
    },
    libraryAlbumId () {
      return this.trackData.library.album.id.toString()
    },
    albumTitle () {
      return this.albumData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
