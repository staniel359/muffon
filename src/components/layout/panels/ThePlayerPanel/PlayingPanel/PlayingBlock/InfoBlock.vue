<template>
  <div class="content">
    <div class="info-block-content">
      <BaseTickerContainer>
        <BaseHeaderContainer tag="h4">
          <BaseLink
            :link="trackMainLinkFormatted"
            :text="trackTitle"
          />

          <span
            v-if="trackExtraTitle"
            class="sub header description main-extra-title"
          >
            {{ &nbsp; }}
            {{ trackExtraTitle }}
          </span>
        </BaseHeaderContainer>
      </BaseTickerContainer>

      <BaseTickerContainer>
        <BaseArtistLinks :artists="artists" />
      </BaseTickerContainer>

      <BaseTickerContainer v-if="albumTitle">
        <div class="main-small-container">
          <small>
            <BaseLink
              :link="albumMainLinkFormatted"
              :text="albumTitle"
            />
          </small>
        </div>
      </BaseTickerContainer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseTickerContainer from '@/containers/BaseTickerContainer.vue'
import BaseLink from '@/BaseLink.vue'
import BaseArtistLinks from '@/BaseArtistLinks.vue'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import formatAlbumSourceParams
  from '#/actions/api/album/formatters/requestData'
import formatTrackSourceParams
  from '#/actions/api/track/formatters/requestData'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeaderContainer,
    BaseTickerContainer,
    BaseLink,
    BaseArtistLinks
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    trackTitle () {
      return this.playerPlaying.title
    },
    trackExtraTitle () {
      return this.playerPlaying.extra_title
    },
    trackMainLinkFormatted () {
      return formatTrackMainLink({
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        sourceParams: this.trackSourceParams
      })
    },
    trackSourceParams () {
      return formatTrackSourceParams({
        sourceId: this.playerPlaying.source_id,
        trackData: this.playerPlaying
      })
    },
    artists () {
      return this.playerPlaying.artists
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        sourceParams: this.albumSourceParams
      })
    },
    albumSourceParams () {
      return formatAlbumSourceParams({
        sourceId: this.albumData.source_id,
        albumData: this.albumData,
        artistName: this.artistName
      })
    },
    albumData () {
      return this.playerPlaying.albums?.[0]
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .no-padding, .flex-full, .overflow-hidden

.info-block-content
  @extend .d-flex, .flex-column, .justify-content-center
  height: 50px

.playing-artist-name
  @extend .text-medium-light
</style>
