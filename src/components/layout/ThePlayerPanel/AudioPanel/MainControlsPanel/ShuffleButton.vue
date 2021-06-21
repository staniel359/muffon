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
import BaseButton from '@/BaseButton.vue'
import { setGlobalData } from '#/actions'
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

      setGlobalData({
        'queue.isShuffle': value,
        'queue.tracksShuffled': tracks
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
