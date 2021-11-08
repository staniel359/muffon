<template>
  <div class="content">
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
    isConnected: Boolean,
    isPlayerWithScrobbling: Boolean
  },
  computed: {
    ...mapState('player', {
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
          this.isPlayerWithScrobbling &&
          this.isPlayerWithScrobbleNotifications
      )
    },
    isDisabled () {
      return !(
        this.isConnected &&
          this.isPlayerWithScrobbling
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

<style lang="sass" scoped></style>
