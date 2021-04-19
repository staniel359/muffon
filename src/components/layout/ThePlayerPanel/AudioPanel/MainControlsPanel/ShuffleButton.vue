<template>
  <div
    class="ui tiny compact icon button"
    :class="{
      disabled: isQueueEmpty,
      basic: !isQueueShuffle
    }"
    @click="handleClick"
  >
    <i class="random icon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getTracksCount as getQueueTracksCount,
  toggleIsShuffle as toggleIsQueueShuffle
} from '#/actions/queue'

export default {
  name: 'ShuffleButton',
  computed: {
    ...mapState('queue', {
      isQueueShuffle: 'isShuffle'
    }),
    isQueueEmpty () {
      return !getQueueTracksCount()
    }
  },
  methods: {
    handleClick () {
      toggleIsQueueShuffle()
    }
  }
}
</script>

<style lang="sass" scoped></style>
