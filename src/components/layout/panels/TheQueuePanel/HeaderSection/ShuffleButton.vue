<template>
  <BaseButton
    class="small circular"
    icon="random"
    :class="{
      basic: !isQueueShuffle
    }"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  shuffleArray
} from '*/helpers/utils'

export default {
  name: 'ShuffleButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      'queue',
      {
        isQueueShuffle: 'isShuffle',
        queueTracks: 'tracks'
      }
    )
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
