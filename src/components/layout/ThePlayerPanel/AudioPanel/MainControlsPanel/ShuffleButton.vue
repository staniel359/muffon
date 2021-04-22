<template>
  <div
    class="ui tiny compact icon button"
    :class="{ basic: !isQueueShuffle }"
    @click="handleClick"
  >
    <i class="random icon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toggleIsShuffle as toggleIsQueueShuffle } from '#/actions/queue'

export default {
  name: 'ShuffleButton',
  computed: {
    ...mapState('queue', {
      isQueueShuffle: 'isShuffle'
    })
  },
  methods: {
    handleClick () {
      toggleIsQueueShuffle()
    }
  }
}
</script>

<style lang="sass" scoped></style>
