<template>
  <BaseTransitionContainer
    class="transition hidden track-full-title"
    :scrollable="scrollable"
  >
    <BaseHeader
      tag="h4"
      :text="trackTitle"
    />

    <div class="track-artist-name">
      <BaseArtistLinks
        :artists="artists"
      />
    </div>

    <div class="track-album-title">
      <BaseLinkContainer
        v-if="albumTitle"
        :link="albumMainLink"
      >
        <div class="link main-small-container">
          <small
            v-text="albumTitle"
          />
        </div>
      </BaseLinkContainer>
    </div>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer
  from '*/components/containers/BaseTransitionContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import {
  main as formatAlbumMainLink
} from '*/helpers/formatters/links/album'
import formatAlbumRequestData from '*/helpers/formatters/request/album/data'

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
      return formatAlbumMainLink(
        {
          albumTitle: this.albumTitle,
          artistName: this.artistName,
          sourceParams: this.sourceParams
        }
      )
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return this.trackData.artist.name
    },
    sourceParams () {
      return formatAlbumRequestData(
        {
          sourceId: this.albumData.source_id,
          albumData: this.albumData,
          artistName: this.artistName
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.track-full-title
  @extend .text-align-center

.track-artist-name
  line-height: 1.2em
  margin-top: 0.2em

.track-album-title
  margin-top: 0.2em
</style>
