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
import BaseHeader from '@/BaseHeader.vue'
import BaseToggle from '@/BaseToggle.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'ScrobbleOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  props: {
    isConnected: Boolean,
    isPlayerScrobbling: Boolean
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'layout.settings.options.services.lastfm.scrobbling'
      )
    },
    isChecked () {
      return (
        this.isConnected &&
          this.isPlayerScrobbling
      )
    },
    isDisabled () {
      return !this.isConnected
    }
  },
  methods: {
    handleToggleOn () {
      setGlobalData({
        'player.isScrobbling': true
      })
    },
    handleToggleOff () {
      setGlobalData({
        'player.isScrobbling': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
