<template>
  <div class="option">
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
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

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
        'settings.options.services.lastfm.scrobbling'
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
