<template>
  <div class="option">
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
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

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
      'player',
      {
        isPlayerWithScrobbleNotifications:
        'isWithScrobbleNotifications'
      }
    ),
    scrobbleNotificationsText () {
      return this.$t(
        'settings.options.services.lastfm.scrobbleNotifications'
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
