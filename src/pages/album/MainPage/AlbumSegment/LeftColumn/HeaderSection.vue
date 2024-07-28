<template>
  <BaseTransitionContainer
    :scrollable="scrollable"
  >
    <div class="text-align-center word-break-break-word main-bottom-small-section">
      <BaseHeader
        tag="h3"
        :text="albumTitle"
      />

      <div class="main-small-artist-name">
        <BaseArtistLinks
          :artists="artists"
        />
      </div>
    </div>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'
import {
  main as formatArtistLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'HeaderSection',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseArtistLinks
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
    artistLink () {
      return formatArtistLink(
        {
          artistName: this.artistName
        }
      )
    },
    artistName () {
      return this.albumData.artist.name
    },
    artists () {
      return this.albumData.artists
    }
  }
}
</script>

<style lang="sass" scoped></style>
