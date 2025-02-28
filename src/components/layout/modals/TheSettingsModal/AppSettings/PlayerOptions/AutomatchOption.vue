<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
        is-beta
      />

      <BaseToggle
        store-key="player.isWithAutomatch"
        :is-checked="isPlayerWithAutomatch"
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

export default {
  name: 'AutomatchOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithAutomatch: 'isWithAutomatch'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.player.automatch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
