<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isWithScrobbling"
        :is-checked="isChecked"
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
  name: 'ScrobbleOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.connections.lastfm.scrobbling'
      )
    },
    isChecked () {
      return this.isPlayerWithScrobbling
    }
  }
}
</script>

<style lang="sass" scoped></style>
