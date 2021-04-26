<template>
  <div class="content">
    <h4 class="ui header track-title">
      <BaseTicker
        :text="trackTitle"
        :link="trackMainLinkFormatted"
      />
    </h4>

    <BaseTicker
      :text="artistName"
      :link="artistMainLinkFormatted"
    />

    <BaseTicker
      v-if="albumTitle"
      :text="albumTitle"
      :link="albumMainLinkFormatted"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseTicker from '@/BaseTicker.vue'
import {
  trackMain as formatTrackMainLink,
  artistMain as formatArtistMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

export default {
  name: 'InfoBlock',
  components: {
    BaseTicker
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    trackTitle () {
      return this.playerPlaying.title
    },
    trackMainLinkFormatted () {
      return formatTrackMainLink({
        artistName: this.artistName,
        trackTitle: this.trackTitle
      })
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
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
</style>
