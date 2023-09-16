<template>
  <BaseLabel
    class="basic circular large more-link-button"
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
  @extend .absolute
  bottom: 10px
  z-index: 1
[dir="ltr"]
  .more-link-button
    right: 10px
[dir="rtl"]
  .more-link-button
    left: 10px
</style>
