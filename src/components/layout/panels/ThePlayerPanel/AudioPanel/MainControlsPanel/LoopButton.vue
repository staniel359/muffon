<template>
  <BaseButton
    class="tiny compact"
    icon="redo alternate"
    :class="{ basic: !isAudioLoop }"
    @click="handleClick"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'LoopButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('audio', {
      isAudioLoop: 'isLoop',
      audioElement: 'element'
    })
  },
  methods: {
    ...mapActions('audio', {
      setIsAudioLoop: 'setIsLoop'
    }),
    handleClick () {
      const value = !this.isAudioLoop

      this.audioElement.loop = value

      this.setIsAudioLoop(value)
    }
  }
}
</script>

<style lang="sass" scoped></style>
