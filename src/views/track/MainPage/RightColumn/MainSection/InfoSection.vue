<template>
  <div class="track-main-info">
    <BaseHeader
      tag="h3"
      :text="trackTitle"
    />

    <BaseHeaderContainer
      class="track-artist-name"
      tag="h4"
    >
      <BaseArtistLinks
        :artists="artists"
      />
    </BaseHeaderContainer>

    <div
      v-if="albumData"
      class="main-header"
    >
      <small>
        <BaseLink
          :link="albumMainLink"
          :text="albumTitle"
        />
      </small>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseArtistLinks from '@/links/BaseArtistLinks.vue'
import BaseLink from '@/links/BaseLink.vue'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import { artistName as formatArtistName } from '#/formatters/artist'
import formatAlbumRequestData from '#/formatters/request/album/requestData'

export default {
  name: 'InfoSection',
  components: {
    BaseHeader,
    BaseHeaderContainer,
    BaseArtistLinks,
    BaseLink
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
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
.track-main-info
  @extend .flex-full
  border-bottom: $border
  padding: 1em
  .description
    @extend .no-margin

.track-artist-name
  @extend .text-medium-light
</style>
