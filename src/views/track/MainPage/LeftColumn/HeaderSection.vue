<template>
  <BaseTransitionContainer
    :scrollable="scrollable"
  >
    <div class="track-full-title">
      <BaseHeader
        tag="h4"
        :text="trackTitle"
      />

      <BaseArtistLinks
        :artists="artists"
      />

      <div
        v-if="albumData"
        class="main-small-container"
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
    </div>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer
  from '*/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'
import BaseAlbumLinkContainer
  from '*/components/containers/links/album/BaseAlbumLinkContainer.vue'

export default {
  name: 'HeaderSection',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseArtistLinks,
    BaseAlbumLinkContainer
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

<style lang="sass" scoped>
.track-full-title
  @extend .text-align-center
</style>
