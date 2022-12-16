<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="percentText"
    />

    <div class="seeker-container">
      <BaseSeeker
        ref="seeker"
        class="bottom aligned labeled ticked with-thumb"
        :class="{
          disabled: isDisabled
        }"
        :options="seekerOptions"
        @mouse-up="handleMouseUp"
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
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  mainScrobblePercentSeekerOptions
} from '@/helpers/formatters/semantic'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'ScrobblePercentOption',
  components: {
    BaseHeader,
    BaseSeeker
  },
  props: {
    isConnected: Boolean,
    isPlayerWithScrobbling: Boolean
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerScrobblePercent: 'scrobblePercent'
      }
    ),
    percentText () {
      return this.$t(
        'settings.options.services.lastfm.scrobblePercent'
      )
    },
    seekerOptions () {
      return mainScrobblePercentSeekerOptions(
        {
          start: this.playerScrobblePercent
        }
      )
    },
    isDisabled () {
      return !(
        this.isConnected &&
          this.isPlayerWithScrobbling
      )
    }
  },
  watch: {
    playerScrobblePercent:
      'handlePlayerScrobblePercentChange'
  },
  methods: {
    handleMouseUp (
      value
    ) {
      updateGlobalStore(
        {
          'player.scrobblePercent': value
        }
      )
    },
    handlePlayerScrobblePercentChange (
      value
    ) {
      this.setSeekerValue(
        value
      )
    },
    setSeekerValue (
      value
    ) {
      this.$refs
        .seeker
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.seeker-container
  width: 120px
</style>
