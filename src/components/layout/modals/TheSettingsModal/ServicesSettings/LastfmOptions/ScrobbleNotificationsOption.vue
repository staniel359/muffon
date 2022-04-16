<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="scrobbleNotificationsText"
    />

    <BaseToggle
      :class="{
        disabled: isDisabled
      }"
      :is-checked="isChecked"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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
      updateGlobalStore(
        {
          'player.isWithScrobbleNotifications': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'player.isWithScrobbleNotifications': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
