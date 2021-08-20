<template>
  <BaseLabelLinkContainer
    class="circular small more-link"
    :link="artistImagesLinkFormatted"
    :isInverted="false"
  >
    <i class="ellipsis horizontal icon more-icon" />
  </BaseLabelLinkContainer>
</template>

<script>
import BaseLabelLinkContainer from '@/containers/BaseLabelLinkContainer.vue'
import { images as formatArtistImagesLink } from '#/formatters/links/artist'

export default {
  name: 'ImagesPageButton',
  components: {
    BaseLabelLinkContainer
  },
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
.more-link
  @extend .no-margin, .absolute
  bottom: 10px
  right: 10px
  z-index: 1

.more-icon
  @extend .no-margin
</style>
