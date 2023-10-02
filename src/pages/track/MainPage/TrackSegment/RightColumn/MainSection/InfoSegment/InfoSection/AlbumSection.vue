<template>
  <div class="description">
    <div class="meta">
      <BaseAlbumLinkContainer
        class="main-link"
        :album-data="albumData"
        :artist-name="artistName"
      >
        {{ albumTitle }}
      </BaseAlbumLinkContainer>
    </div>
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
    }
  },
  computed: {
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
