<template>
  <BaseButton
    class="tiny compact"
    icon="random"
    :class="{ basic: !isQueueShuffle }"
    @click="handleClick"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from '@/buttons/BaseButton.vue'
import { updateStore } from '#/actions'
import { shuffleArray } from '#/utils'

export default {
  name: 'ShuffleButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('queue', {
      isQueueShuffle: 'isShuffle',
      queueTracks: 'tracks'
    })
  },
  methods: {
    handleClick () {
      const value = !this.isQueueShuffle
      const tracks = value
        ? shuffleArray(this.queueTracks)
        : []

      updateStore({
        'queue.isShuffle': value,
        'queue.tracksShuffled': tracks
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
