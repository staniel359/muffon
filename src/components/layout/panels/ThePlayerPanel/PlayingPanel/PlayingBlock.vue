<template>
  <div class="item track-block">
    <ImageBlock
      :is-with-image="isFromSource"
    />

    <InfoBlock
      :key="key"
      :is-with-album="isFromSource"
    />

    <BaseSourceIcon
      class="description track-source-icon"
      :source-id="sourceId"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import ImageBlock from './PlayingBlock/ImageBlock.vue'
import InfoBlock from './PlayingBlock/InfoBlock.vue'
import BaseSourceIcon from '*/components/BaseSourceIcon.vue'
import {
  generateKey
} from '*/helpers/utils'

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
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    isFromSource () {
      return !!this.playerPlaying.from_source
    },
    sourceId () {
      return this.playerPlaying.audio.source_id
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
