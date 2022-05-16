<template>
  <div class="content info-block">
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
} from 'vuex'
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
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    isRenderAlbum () {
      return (
        this.isFromSource &&
          !!this.albumData
      )
    },
    isFromSource () {
      return !!this.playerPlaying.from_source
    },
    albumData () {
      return this.playerPlaying.album
    }
  }
}
</script>

<style lang="sass" scoped>
.info-block
  @extend .no-padding, .flex-full, .overflow-hidden
</style>
