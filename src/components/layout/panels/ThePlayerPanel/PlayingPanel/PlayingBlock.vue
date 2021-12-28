<template>
  <div class="item track-block">
    <ImageBlock
      :image="imageData?.extrasmall"
      :artistName="artistName"
      :isWithImage="isFromSource"
    />

    <InfoBlock
      :key="key"
      :isWithAlbum="isFromSource"
    />

    <BaseSourceIcon
      class="description track-source-icon"
      :sourceId="sourceId"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageBlock from './PlayingBlock/ImageBlock.vue'
import InfoBlock from './PlayingBlock/InfoBlock.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import { generateKey } from '#/utils'
import { artistName as formatArtistName } from '#/formatters/artist'

export default {
  name: 'PlayingBlock',
  components: {
    ImageBlock,
    InfoBlock,
    BaseSourceIcon
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    imageData () {
      return this.playerPlaying.image
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.playerPlaying.artists
    },
    sourceId () {
      return this.playerPlaying.audio.source_id
    },
    albumData () {
      return this.playerPlaying.album
    },
    isFromSource () {
      return !!this.playerPlaying.from_source
    }
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange'
  },
  methods: {
    handlePlayerPlayingChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>
.track-block
  @extend .d-flex, .align-items-center

.track-source-icon
  margin-left: 0.5em !important
</style>
