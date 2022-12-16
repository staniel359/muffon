<template>
  <BaseTickerContainer>
    <div class="description">
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
  </BaseTickerContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseTickerContainer
  from '@/components/containers/BaseTickerContainer.vue'
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'

export default {
  name: 'AlbumSection',
  components: {
    BaseTickerContainer,
    BaseAlbumLinkContainer
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    albumData () {
      return this.playerPlaying.album
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    albumTitle () {
      return this.albumData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
