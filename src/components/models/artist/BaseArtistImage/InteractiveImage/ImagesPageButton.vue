<template>
  <RouterLink
    class="ui circular mini label view-more-link"
    :to="artistImagesLinkFormatted"
  >
    <i class="ellipsis horizontal icon view-more-icon" />
  </RouterLink>
</template>

<script>
import { artistImages as formatArtistImagesLink } from '#/formatters/links'

export default {
  name: 'ImagesPageButton',
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  computed: {
    artistImagesLinkFormatted () {
      return formatArtistImagesLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.view-more-link
  @extend .no-margin, .absolute
  bottom: 10px
  right: 10px
  z-index: 1

.view-more-icon
  @extend .no-margin
</style>
