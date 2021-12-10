<template>
  <BaseTransitionContainer
    class="transition hidden album-full-title"
    :scrollable="scrollable"
  >
    <BaseHeader
      tag="h3"
      :text="albumTitle"
    />

    <BaseLink
      :link="artistMainLinkFormatted"
      :text="artistName"
    />
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseLink from '@/links/BaseLink.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'

export default {
  name: 'AlbumHeader',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseLink
  },
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    scrollable: HTMLDivElement
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
.album-full-title
  @extend .text-align-center
</style>
