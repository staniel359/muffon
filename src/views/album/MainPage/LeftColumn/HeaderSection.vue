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
      :link="artistMainLink"
      :text="artistName"
    />
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseLink from '@/links/BaseLink.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { artistName as formatArtistName } from '#/formatters'

export default {
  name: 'HeaderSection',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseLink
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    artistMainLink () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.albumData.artists
    }
  }
}
</script>

<style lang="sass" scoped>
.album-full-title
  @extend .text-align-center
</style>
