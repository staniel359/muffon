<template>
  <h2 class="ui header main-header">
    <RouterLink
      class="main-link"
      :to="artistMainLinkFormatted"
    >
      {{ artistName }}
    </RouterLink>
  </h2>
</template>

<script>
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'ArtistHeader',
  props: {
    artistName: {
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
.main-header
  margin-bottom: 5px !important
</style>
