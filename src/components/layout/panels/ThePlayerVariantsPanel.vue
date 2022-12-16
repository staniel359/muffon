<template>
  <VariantsPanel
    v-if="isRenderVariantsPanel"
  />

  <PlayerPanel
    @visibility-change="handlePlayerPanelVisibilityChange"
  />
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
      isPlayerPanelVisible: false
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerVariantsCount: 'variantsCount'
      }
    ),
    isRenderVariantsPanel () {
      return (
        this.isPlayerPanelVisible &&
          this.playerVariantsCount
      )
    }
  },
  methods: {
    handlePlayerPanelVisibilityChange (
      value
    ) {
      this.isPlayerPanelVisible = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
