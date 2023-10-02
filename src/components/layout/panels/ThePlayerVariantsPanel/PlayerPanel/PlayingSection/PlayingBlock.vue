<template>
  <div class="item main-simple-list-item middle-aligned no-padding">
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
} from 'pinia'
import playerStore from '@/stores/player'
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
      playerStore,
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
.main-simple-list-item
  :deep(.extra)
    margin-top: 0.2rem !important
  :deep(.description)
    margin-top: 0.2rem !important
</style>
