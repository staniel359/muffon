<template>
  <div class="item track-block">
    <ImageBlock
      :image="image"
      :artistName="artistName"
    />

    <InfoBlock :key="key" />

    <BaseSourceIcon
      class="description track-source-icon"
      :sourceId="sourceId"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageBlock from './TrackBlock/ImageBlock.vue'
import InfoBlock from './TrackBlock/InfoBlock.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TrackBlock',
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
    image () {
      return this.playerPlaying.image?.extrasmall
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    sourceId () {
      return this.playerPlaying.audio.source
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
  @extend .no-padding, .no-margin
  margin-left: 0.5em !important
</style>
