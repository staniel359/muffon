<template>
  <BaseTransitionContainer
    :scrollable="scrollable"
  >
    <div class="album-full-title">
      <BaseHeader
        tag="h3"
        :text="albumTitle"
      />

      <BaseArtistLinks
        :artists="artists"
      />

      <BaseDivider
        v-if="profileId"
      />
    </div>
  </BaseTransitionContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import {
  main as formatArtistMainLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'HeaderSection',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseArtistLinks,
    BaseDivider
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    albumTitle () {
      return this.albumData.title
    },
    artistMainLink () {
      return formatArtistMainLink(
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

<style lang="sass" scoped>
.album-full-title
  @extend .text-align-center
  margin-top: 0.75em
</style>
