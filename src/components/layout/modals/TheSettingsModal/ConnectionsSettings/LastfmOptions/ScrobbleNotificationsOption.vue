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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'ScrobbleNotificationsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  props: {
    isConnected: Boolean,
    isPlayerWithScrobbling: Boolean
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithScrobbleNotifications:
        'isWithScrobbleNotifications'
      }
    ),
    scrobbleNotificationsText () {
      return this.$t(
        'settings.options.connections.lastfm.scrobbleNotifications'
      )
    },
    isChecked () {
      return (
        this.isConnected &&
          this.isPlayerWithScrobbleNotifications
      )
    },
    isDisabled () {
      return !(
        this.isConnected &&
          this.isPlayerWithScrobbling
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
