<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="scrobblingText"
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
import { updateStore } from '#/actions'

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
        'layout.settings.options.services.lastfm.scrobbling'
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
  },
  methods: {
    handleToggleOn () {
      updateStore({
        'player.isWithScrobbling': true
      })
    },
    handleToggleOff () {
      updateStore({
        'player.isWithScrobbling': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
