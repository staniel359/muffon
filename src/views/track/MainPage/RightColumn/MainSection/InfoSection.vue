<template>
  <div class="track-main-info">
    <BaseHeaderContainer
      tag="h3"
    >
      <template #default>
        {{ trackTitle }}

        <span
          v-if="trackExtraTitle"
          class="sub header main-extra-title"
        >
          <strong
            v-html="trackExtraTitle"
          />
        </span>
      </template>
    </BaseHeaderContainer>

    <BaseHeaderContainer
      class="track-artist-name"
      tag="h4"
    >
      <template #default>
        <BaseArtistLinks
          :artists="artists"
        />
      </template>
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
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import {
  main as formatAlbumMainLink
} from '*/helpers/formatters/links/album'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'
import formatAlbumRequestData from '*/helpers/formatters/request/album/data'

export default {
  name: 'InfoSection',
  components: {
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
      return formatArtistName(
        this.artists
      )
    },
    sourceParams () {
      return formatAlbumRequestData(
        {
          sourceId: this.albumData.source_id,
          albumData: this.albumData,
          artistName: this.artistName
        }
      )
    },
    trackExtraTitle () {
      return this.trackData.extra_title
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
