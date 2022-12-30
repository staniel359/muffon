<template>
  <BaseButton
    class="small circular compact"
    icon="audioShuffle"
    :class="isActive ? 'primary' : 'basic'"
    :is-invertable="!isActive"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  shuffleArray
} from '@/helpers/utils'

export default {
  name: 'ShuffleButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isQueueShuffle: 'isShuffle',
        queueTracks: 'tracks'
      }
    ),
    isActive () {
      return this.isQueueShuffle
    }
  },
  methods: {
    handleClick () {
      updateGlobalStore(
        {
          'queue.isShuffle':
            !this.isQueueShuffle,
          'queue.tracksShuffled':
            this.shuffleTracks()
        }
      )
    },
    shuffleTracks () {
      return shuffleArray(
        this.queueTracks
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
