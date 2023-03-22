<template>
  <VariantsPanel
    v-if="isRenderVariantsPanel"
  />

  <PlayerPanel />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import VariantsPanel from './ThePlayerVariantsPanel/VariantsPanel.vue'
import PlayerPanel from './ThePlayerVariantsPanel/PlayerPanel.vue'

export default {
  name: 'ThePlayerVariantsPanel',
  components: {
    VariantsPanel,
    PlayerPanel
  },
  data () {
    return {
      isVisible: false,
      playerPanelTransitionDuration: 500
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        playerVariantsCount: 'variantsCount'
      }
    ),
    isRenderVariantsPanel () {
      return (
        this.isVisible &&
          this.playerVariantsCount
      )
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  mounted () {
    if (this.playerPlaying) {
      this.setVisible()
    }
  },
  methods: {
    handlePlayerPlayingChange (
      value
    ) {
      if (value) {
        setTimeout(
          this.setVisible,
          this.playerPanelTransitionDuration
        )
      } else {
        this.setHidden()
      }
    },
    setVisible () {
      this.isVisible = true
    },
    setHidden () {
      this.isVisible = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
