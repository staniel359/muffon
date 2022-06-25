<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="scrobblingText"
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
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'player.isWithScrobbling': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'player.isWithScrobbling': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
