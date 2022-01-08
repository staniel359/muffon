<template>
  <div class="content">
    <div class="info-block-content">
      <BaseTickerContainer>
        <BaseHeaderContainer tag="h4">
          <BaseLink
            :link="trackMainLink"
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
        <BaseArtistLinks
          :artists="artists"
        />
      </BaseTickerContainer>

      <BaseTickerContainer
        v-if="isRenderAlbumTitle"
      >
        <div class="main-small-container">
          <small>
            <BaseLink
              :link="albumMainLink"
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
import BaseLink from '@/links/BaseLink.vue'
import BaseArtistLinks from '@/links/BaseArtistLinks.vue'
import { main as formatTrackMainLink } from '#/formatters/links/track'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import formatAlbumRequestData from '#/formatters/request/album/requestData'
import formatTrackSourceParams
  from '#/formatters/request/track/requestData'
import { artistName as formatArtistName } from '#/formatters'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeaderContainer,
    BaseTickerContainer,
    BaseLink,
    BaseArtistLinks
  },
  props: {
    isWithAlbum: Boolean
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
    trackMainLink () {
      return formatTrackMainLink({
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        sourceParams: this.trackSourceParams
      })
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.playerPlaying.artists
    },
    trackSourceParams () {
      return formatTrackSourceParams({
        sourceId: this.playerPlaying.source_id,
        trackData: this.playerPlaying
      })
    },
    isRenderAlbumTitle () {
      return (
        this.isWithAlbum &&
          !!this.albumTitle
      )
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.playerPlaying.album
    },
    albumMainLink () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        sourceParams: this.albumSourceParams
      })
    },
    albumSourceParams () {
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
.content
  @extend .no-padding, .flex-full, .overflow-hidden

.info-block-content
  @extend .d-flex, .flex-column, .justify-content-center
  height: 50px

.playing-artist-name
  @extend .text-medium-light
</style>
