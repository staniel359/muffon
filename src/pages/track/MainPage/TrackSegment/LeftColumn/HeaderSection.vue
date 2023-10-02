<template>
  <BaseTransitionContainer
    :scrollable="scrollable"
  >
    <div class="main-bottom-mini-section text-align-center word-break-break-word">
      <BaseHeader
        tag="h4"
        :text="trackTitle"
      />

      <div class="main-small-artist-name">
        <BaseArtistLinks
          :artists="artists"
        />
      </div>

      <div
        v-if="albumData"
        class="main-small-album-title"
      >
        <small>
          <BaseAlbumLinkContainer
            class="main-link"
            :album-data="albumData"
            :artist-name="artistName"
          >
            {{ albumTitle }}
          </BaseAlbumLinkContainer>
        </small>
      </div>

      <BaseDivider />
    </div>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseDivider from '@/components/BaseDivider.vue'

export default {
  name: 'HeaderSection',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseArtistLinks,
    BaseAlbumLinkContainer,
    BaseDivider
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    artists () {
      return this.trackData.artists
    },
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.albumData?.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
