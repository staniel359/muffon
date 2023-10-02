<template>
  <BaseButton
    class="circular compact simple"
    icon="audioShuffle"
    :class="buttonClass"
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
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
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
    },
    buttonClass () {
      if (this.isActive) {
        return 'primary'
      } else {
        return 'basic'
      }
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
