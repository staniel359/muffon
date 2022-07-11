<template>
  <div class="player-extra-controls">
    <BitrateBlock
      v-if="isRenderBitrateBlock"
      :key="key"
    />

    <SaveButton
      :key="key"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BitrateBlock from './ExtraControlsPanel/BitrateBlock.vue'
import SaveButton from './ExtraControlsPanel/SaveButton.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'ExtraControlsPanel',
  components: {
    BitrateBlock,
    SaveButton
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
        isPlayerWithBitrate: 'isWithBitrate',
        playerPlaying: 'playing'
      }
    ),
    isRenderBitrateBlock () {
      return (
        this.isPlayerWithBitrate &&
          this.playerPlaying
      )
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
.player-extra-controls
  @extend .d-flex, .align-items-center, .justify-content-flex-end
  flex: 0.3
</style>
