<template>
  <BaseLabel
    class="basic circular large absolute main-bottom-right-small-button hidden-item"
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

<style lang="sass" scoped></style>
