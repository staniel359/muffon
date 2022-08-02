<template>
  <BaseClearButton
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'CloseButton',
  components: {
    BaseClearButton
  },
  computed: {
    ...mapState(
      'queue',
      {
        isClearQueueOnPlayerClose:
          'isClearOnPlayerClose'
      }
    )
  },
  methods: {
    handleClick () {
      this.clearPlaying()

      if (this.isClearQueueOnPlayerClose) {
        this.clearQueue()
      }
    },
    clearPlaying () {
      updateGlobalStore(
        {
          'player.playing': null
        }
      )
    },
    clearQueue () {
      updateGlobalStore(
        {
          'queue.currentTrackId': null,
          'queue.tracks': [],
          'queue.tracksShuffled': [],
          'queue.isShuffle': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
