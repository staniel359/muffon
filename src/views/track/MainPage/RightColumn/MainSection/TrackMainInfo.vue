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
      <BaseLink
        :link="artistMainLinkFormatted"
        :text="artistName"
      />
    </BaseHeaderContainer>

    <div
      v-if="albumData"
      class="main-header"
    >
      <small>
        <BaseLink
          :link="albumMainLinkFormatted"
          :text="albumTitle"
        />
      </small>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import formatAlbumSourceParams
  from '#/actions/api/album/formatters/requestData'

export default {
  name: 'TrackMainInfo',
  components: {
    BaseHeader,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    trackTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    albumData: Object
  },
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        sourceParams: this.sourceParams
      })
    },
    albumTitle () {
      return this.albumData?.title
    },
    sourceParams () {
      return formatAlbumSourceParams({
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
