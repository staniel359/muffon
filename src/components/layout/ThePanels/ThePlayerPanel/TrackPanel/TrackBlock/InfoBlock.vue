<template>
  <div class="content">
    <BaseHeaderContainer
      class="track-title"
      tag="h4"
    >
      <BaseTickerContainer>
        <BaseLink
          :link="trackMainLinkFormatted"
          :text="trackTitle"
        />

        <span
          v-if="trackExtraTitle"
          class="sub header description main-extra-title"
        >
          {{ &nbsp; }}
          {{ trackExtraTitle }}
        </span>
      </BaseTickerContainer>
    </BaseHeaderContainer>

    <BaseTickerContainer>
      <BaseArtistLinks :artists="artists" />
    </BaseTickerContainer>

    <small>
      <BaseTickerContainer v-if="albumTitle">
        <BaseLink
          :link="albumMainLinkFormatted"
          :text="albumTitle"
        />
      </BaseTickerContainer>
    </small>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseTickerContainer from '@/containers/BaseTickerContainer.vue'
import BaseLink from '@/BaseLink.vue'
import BaseArtistLinks from '@/BaseArtistLinks.vue'
import {
  trackMain as formatTrackMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeaderContainer,
    BaseTickerContainer,
    BaseLink,
    BaseArtistLinks
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    trackTitle () {
      return this.playerPlaying.title
    },
    trackExtraTitle () {
      return this.playerPlaying.extra_title
    },
    trackMainLinkFormatted () {
      return formatTrackMainLink({
        artistName: this.artistName,
        trackTitle: this.trackTitle
      })
    },
    artists () {
      return this.playerPlaying.artists
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .no-padding, .flex-full, .overflow-hidden

.playing-artist-name
  @extend .text-medium-light
</style>
