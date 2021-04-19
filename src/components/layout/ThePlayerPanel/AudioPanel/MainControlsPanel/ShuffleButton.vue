<template>
  <div
    class="ui tiny compact icon button"
    :class="{
      disabled: !queueTracksLength,
      basic: !isQueueShuffle
    }"
    @click="handleClick"
  >
    <i class="random icon" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { toggleIsShuffle as toggleIsQueueShuffle } from '#/actions/queue'

export default {
  name: 'ShuffleButton',
  computed: {
    ...mapState('queue', {
      isQueueShuffle: 'isShuffle'
    }),
    ...mapGetters('queue', {
      queueTracksLength: 'tracksLength'
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
