<template>
  <div class="track-panel">
    <div class="ui middle aligned list track-container">
      <div
        v-if="playerPlaying"
        class="item track-item"
      >
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageBlock from './TrackPanel/ImageBlock.vue'
import InfoBlock from './TrackPanel/InfoBlock.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TrackPanel',
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
.track-panel
  @extend .d-flex, .align-items-center
  width: 230px
  padding: 0 0.5em

.track-container
  @extend .w-100

.track-item
  @extend .d-flex, .align-items-center

.track-source-icon
  @extend .no-padding, .no-margin
  margin-left: 0.5em !important
</style>
