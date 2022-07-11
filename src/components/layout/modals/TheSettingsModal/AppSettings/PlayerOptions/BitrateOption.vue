<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="bitrateText"
    />

    <BaseToggle
      :is-checked="isPlayerWithBitrate"
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
  name: 'BitrateOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'player',
      {
        isPlayerWithBitrate: 'isWithBitrate'
      }
    ),
    bitrateText () {
      return this.$t(
        'settings.options.app.player.bitrate'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'player.isWithBitrate': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'player.isWithBitrate': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
