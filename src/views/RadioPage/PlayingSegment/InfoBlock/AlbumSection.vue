<template>
  <BaseHeaderContainer
    v-if="albumData && albumTitle"
    class="playing-header playing-album-title"
    tag="h6"
  >
    <BaseAlbumLinkContainer
      class="main-link"
      :album-data="albumData"
      :artist-name="artistName"
    >
      {{ albumTitle }}
    </BaseAlbumLinkContainer>
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'

export default {
  name: 'AlbumSection',
  components: {
    BaseHeaderContainer,
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

<style lang="sass" scoped>
.playing-album-title
  @extend .text-medium-light
  margin-top: 0.3em !important
</style>
