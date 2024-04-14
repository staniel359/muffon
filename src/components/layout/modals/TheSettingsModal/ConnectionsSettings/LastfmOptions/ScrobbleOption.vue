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
  name: 'ScrobbleOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    ),
    scrobblingText () {
      return this.$t(
        'settings.options.connections.lastfm.scrobbling'
      )
    },
    isChecked () {
      return this.isPlayerWithScrobbling
    }
  }
}
</script>

<style lang="sass" scoped></style>
