<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="equalizerText"
      />

      <BaseToggle
        store-key="player.isWithEqualizer"
        :is-checked="isPlayerWithEqualizer"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'EqualizerOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithEqualizer:
          'isWithEqualizer'
      }
    ),
    equalizerText () {
      return this.$t(
        'settings.options.app.player.equalizer'
      )
    }
  },
  watch: {
    isPlayerWithEqualizer:
      'handleIsPlayerWithEqualizerChange'
  },
  methods: {
    handleIsPlayerWithEqualizerChange (
      value
    ) {
      if (!value) {
        updateGlobalStore(
          {
            'audio.isEqualizerEnabled': false
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
