<template>
  <div class="item main-simple-list-item playing-block">
    <ImageBlock />

    <InfoBlock
      :key="key"
    />

    <SourceIconBlock />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import ImageBlock from './PlayingBlock/ImageBlock.vue'
import InfoBlock from './PlayingBlock/InfoBlock.vue'
import SourceIconBlock from './PlayingBlock/SourceIconBlock.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'PlayingBlock',
  components: {
    ImageBlock,
    InfoBlock,
    SourceIconBlock
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
.playing-block
  @extend .d-flex, .align-items-center
</style>
