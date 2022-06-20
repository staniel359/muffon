<template>
  <div class="player-extra-controls">
    <SaveButton
      :key="key"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import SaveButton from './ExtraControlsPanel/SaveButton.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'ExtraControlsPanel',
  components: {
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
        playerPlaying: 'playing'
      }
    )
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
