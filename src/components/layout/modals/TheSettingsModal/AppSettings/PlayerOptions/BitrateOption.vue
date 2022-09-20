<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="bitrateText"
    />

    <BaseToggle
      store-key="player.isWithBitrate"
      :is-checked="isPlayerWithBitrate"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

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
  }
}
</script>

<style lang="sass" scoped></style>
