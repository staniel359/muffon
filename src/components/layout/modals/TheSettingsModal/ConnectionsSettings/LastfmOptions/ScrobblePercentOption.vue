<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <div class="seeker-container">
        <BaseSeeker
          ref="seeker"
          class="bottom aligned labeled ticked with-thumb"
          :options="seekerOptions"
          :is-disabled="isDisabled"
          @mouse-up="handleMouseUp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  scrobblePercent as scrobblePercentSeekerOptions
} from '@/helpers/formatters/plugins/semantic/options/seeker'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ScrobblePercentOption',
  components: {
    BaseSettingsOptionHeader,
    BaseSeeker
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerScrobblePercent: 'scrobblePercent',
        isPlayerWithScrobbling: 'isWithScrobbling'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.connections.lastfm.scrobblePercent'
      )
    },
    seekerOptions () {
      return scrobblePercentSeekerOptions(
        {
          start: this.playerScrobblePercent
        }
      )
    },
    isDisabled () {
      return !this.isPlayerWithScrobbling
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
