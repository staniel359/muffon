<template>
  <div class="content scrobble-option">
    <BaseHeader
      tag="h4"
      :text="headerFormatted"
    />

    <BaseToggle
      :class="{ disabled: isDisabled }"
      :isChecked="isChecked"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import BaseToggle from '@/BaseToggle.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'ScrobbleNotificationsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  props: {
    isConnected: Boolean
  },
  computed: {
    ...mapState('player', {
      isPlayerScrobbling: 'isScrobbling',
      isPlayerWithScrobbleNotifications: 'isWithScrobbleNotifications'
    }),
    headerFormatted () {
      return this.$t(
        'layout.settings.options.services.lastfm.scrobbleNotifications'
      )
    },
    isChecked () {
      return (
        this.isConnected &&
          this.isPlayerScrobbling &&
          this.isPlayerWithScrobbleNotifications
      )
    },
    isDisabled () {
      return !(
        this.isConnected &&
          this.isPlayerScrobbling
      )
    }
  },
  methods: {
    handleToggleOn () {
      setGlobalData({
        'player.isWithScrobbleNotifications': true
      })
    },
    handleToggleOff () {
      setGlobalData({
        'player.isWithScrobbleNotifications': false
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.scrobble-option
  margin-top: 1em
</style>
