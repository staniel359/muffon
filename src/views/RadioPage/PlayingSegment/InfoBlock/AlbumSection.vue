<template>
  <div
    v-if="albumTitle"
    class="album-section"
  >
    <small>
      <BaseAlbumLinkContainer
        class="main-link"
        :album-data="albumData"
        :artist-name="artistName"
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
    }
  },
  computed: {
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return this.trackData.artist.name
    }
  }
}
</script>

<style lang="sass" scoped>
.album-section
  line-height: 1em
</style>
