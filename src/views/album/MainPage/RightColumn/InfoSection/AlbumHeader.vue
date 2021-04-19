<template>
  <div class="album-header">
    <h2 class="ui header main-header">
      {{ albumTitle }}
    </h2>

    <h3 class="ui header main-header">
      <RouterLink
        class="main-link"
        :to="artistMainLinkFormatted"
      >
        {{ artistName }}
      </RouterLink>
    </h3>
  </div>
</template>

<script>
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'AlbumHeader',
  props: {
    artistName: {
      type: String,
      required: true
    },
    albumTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.album-header
  margin-bottom: 10px
</style>
