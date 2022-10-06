<template>
  <BaseTickerContainer>
    <BaseArtistLinks
      :artists="artists"
    />
  </BaseTickerContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
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
      'player',
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
