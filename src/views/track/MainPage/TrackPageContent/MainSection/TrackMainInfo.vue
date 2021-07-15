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

    <small>
      <BaseLink
        v-if="albumTitle"
        :link="albumMainLinkFormatted"
        :text="albumTitle"
      />
    </small>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import {
  artistMain as formatArtistMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

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
    albumTitle: String
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
