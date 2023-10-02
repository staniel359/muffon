<template>
  <BaseOption
    icon="close"
    :text="closeText"
    is-icon-red
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseOption from '@/components/popups/options/BaseOption.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'CloseOption',
  components: {
    BaseOption
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isClearQueueOnPlayerClose:
          'isClearOnPlayerClose'
      }
    ),
    closeText () {
      return this.$t(
        'actions.close'
      )
    }
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
