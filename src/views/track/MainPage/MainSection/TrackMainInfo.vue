<template>
  <div class="track-main-info">
    <h3 class="ui header main-header">
      {{ trackTitle }}
    </h3>

    <h4 class="ui header main-header">
      <RouterLink
        class="main-link"
        :to="artistMainLinkFormatted"
      >
        {{ artistName }}
      </RouterLink>
    </h4>

    <RouterLink
      v-if="albumTitle"
      class="main-link"
      :to="albumMainLinkFormatted"
    >
      {{ albumTitle }}
    </RouterLink>
  </div>
</template>

<script>
import {
  artistMain as formatArtistMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

export default {
  name: 'TrackMainInfo',
  props: {
    trackTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    albumTitle: String
  },
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        albumTitle: this.albumTitle,
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.track-main-info
  @extend .flex-full
  padding: 1em
  .description
    @extend .no-margin
</style>
