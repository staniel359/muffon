<template>
  <BaseLabel
    class="basic circular large more-link-button absolute d-none main-bottom-right-button"
    icon="dotsHorizontal"
    :link="artistImagesLink"
  />
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  images as formatArtistImagesLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'MoreLinkButton',
  components: {
    BaseLabel
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  computed: {
    artistImagesLink () {
      return formatArtistImagesLink(
        {
          artistName: this.artistName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.more-link-button
  z-index: 1
</style>
