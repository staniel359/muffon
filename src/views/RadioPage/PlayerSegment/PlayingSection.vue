<template>
  <div
    v-if="trackData"
    class="playing-section"
  >
    <InfoBlock
      :track-data="trackData"
    />

    <ImageBlock
      :track-data="trackData"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import InfoBlock from './PlayingSection/InfoBlock.vue'
import ImageBlock from './PlayingSection/ImageBlock.vue'

export default {
  name: 'PlayingSection',
  components: {
    InfoBlock,
    ImageBlock
  },
  data () {
    return {
      trackData: null
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
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    }
  },
  methods: {
    handlePlayerPlayingChange (
      value
    ) {
      if (value?.from_radio) {
        this.trackData = value
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-section
  @extend .relative, .overflow-hidden
  border: $borderInverted
  border-radius: 5px
</style>
