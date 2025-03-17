<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'EqualizerOption',
  components: {
    BaseSettingsOptionHeader,
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
    optionText () {
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
