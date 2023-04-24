<template>
  <BaseTickerContainer>
    <div class="extra">
      <BaseArtistLinks
        :artists="artists"
      />
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
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'ArtistsSection',
  components: {
    BaseTickerContainer,
    BaseArtistLinks
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    artists () {
      return this.playerPlaying.artists
    }
  }
}
</script>

<style lang="sass" scoped></style>
