<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="percentText"
    />

    <div class="seeker-container">
      <BaseSeeker
        class="bottom aligned labeled ticked with-thumb"
        :class="{
          disabled: isDisabled
        }"
        :options="seekerOptions"
        @init="handleSeekerInit"
        @mouse-up="handleMouseUp"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  mainScrobblePercentSeekerOptions
} from '@/helpers/data/plugins/semantic'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  setSeekerValue
} from '@/helpers/actions/plugins/semantic'

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
  data () {
    return {
      seeker: null
    }
  },
  computed: {
    ...mapState(
      'player',
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
    handleSeekerInit (
      element
    ) {
      this.seeker = element
    },
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
      setSeekerValue(
        this.seeker,
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
