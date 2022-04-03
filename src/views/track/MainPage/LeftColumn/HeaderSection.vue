<template>
  <BaseTransitionContainer
    class="transition hidden track-full-title"
    :scrollable="scrollable"
  >
    <BaseHeader
      tag="h4"
      :text="trackTitle"
    />

    <BaseArtistLinks
      :artists="artists"
    />

    <BaseLinkContainer
      v-if="albumTitle"
      :link="albumMainLink"
    >
      <div class="link main-small-container">
        <small>
          {{ albumTitle }}
        </small>
      </div>
    </BaseLinkContainer>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer
  from '*/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import { main as formatAlbumMainLink } from '*/helpers/formatters/links/album'
import formatAlbumRequestData from '*/helpers/formatters/request/album/data'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'HeaderSection',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseArtistLinks,
    BaseLinkContainer
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
    albumMainLink () {
      return formatAlbumMainLink({
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        sourceParams: this.sourceParams
      })
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    sourceParams () {
      return formatAlbumRequestData({
        sourceId: this.albumData.source_id,
        albumData: this.albumData,
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.track-full-title
  @extend .text-align-center
</style>
