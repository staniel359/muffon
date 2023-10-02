<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="scrobblingText"
      />

      <BaseToggle
        store-key="player.isWithScrobbling"
        :class="{
          disabled: isDisabled
        }"
        :is-checked="isChecked"
      />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'ScrobbleOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  props: {
    isConnected: Boolean,
    isPlayerWithScrobbling: Boolean
  },
  computed: {
    scrobblingText () {
      return this.$t(
        'settings.options.connections.lastfm.scrobbling'
      )
    },
    isChecked () {
      return (
        this.isConnected &&
          this.isPlayerWithScrobbling
      )
    },
    isDisabled () {
      return !this.isConnected
    }
  }
}
</script>

<style lang="sass" scoped></style>
