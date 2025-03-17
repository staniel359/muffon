<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isWithScrobbleNotifications"
        :class="{
          disabled: isDisabled
        }"
        :is-checked="isPlayerWithScrobbleNotifications"
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
  name: 'ScrobbleNotificationsOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithScrobbleNotifications:
          'isWithScrobbleNotifications',
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.connections.lastfm.scrobbleNotifications'
      )
    },
    isChecked () {
      return this.isPlayerWithScrobbleNotifications
    },
    isDisabled () {
      return !this.isPlayerWithScrobbling
    }
  }
}
</script>

<style lang="sass" scoped></style>
