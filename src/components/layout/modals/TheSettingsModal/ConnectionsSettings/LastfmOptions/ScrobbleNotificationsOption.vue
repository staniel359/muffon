<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="scrobbleNotificationsText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'ScrobbleNotificationsOption',
  components: {
    BaseHeader,
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
    scrobbleNotificationsText () {
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
