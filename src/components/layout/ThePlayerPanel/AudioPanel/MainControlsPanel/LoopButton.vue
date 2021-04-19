<template>
  <div
    class="ui tiny compact icon button"
    :class="{ basic: !isAudioLoop }"
    @click="handleClick"
  >
    <i class="redo alternate icon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toggleIsLoop as toggleIsAudioLoop } from '#/actions/audio'

export default {
  name: 'LoopButton',
  computed: {
    ...mapState('audio', {
      isAudioLoop: 'isLoop'
    })
  },
  methods: {
    handleClick () {
      toggleIsAudioLoop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
