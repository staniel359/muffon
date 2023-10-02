<template>
  <div class="content info-block no-padding center-aligned-full-column overflow-hidden">
    <TitleSection />

    <ArtistsSection />

    <AlbumSection
      v-if="isRenderAlbum"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import TitleSection from './InfoBlock/TitleSection.vue'
import ArtistsSection from './InfoBlock/ArtistsSection.vue'
import AlbumSection from './InfoBlock/AlbumSection.vue'

export default {
  name: 'InfoBlock',
  components: {
    TitleSection,
    ArtistsSection,
    AlbumSection
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        isPlayerWithAlbum: 'isWithAlbum'
      }
    ),
    isRenderAlbum () {
      return (
        this.isWithAlbum &&
          !!this.albumTitle
      )
    },
    isWithAlbum () {
      return (
        this.isPlayerWithAlbum ||
          this.isFromSource
      )
    },
    isFromSource () {
      return !!this.playerPlaying.from_source
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.playerPlaying.album
    }
  }
}
</script>

<style lang="sass" scoped>
.info-block
  height: 60px
</style>
