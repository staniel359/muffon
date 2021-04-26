<template>
  <BaseLabelLinkContainer
    class="circular small view-more-link"
    :link="artistImagesLinkFormatted"
    :isInverted="false"
  >
    <i class="ellipsis horizontal icon view-more-icon" />
  </BaseLabelLinkContainer>
</template>

<script>
import BaseLabelLinkContainer from '@/containers/BaseLabelLinkContainer.vue'
import { artistImages as formatArtistImagesLink } from '#/formatters/links'

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
.view-more-link
  @extend .no-margin, .absolute
  bottom: 10px
  right: 10px
  z-index: 1

.view-more-icon
  @extend .no-margin
</style>
