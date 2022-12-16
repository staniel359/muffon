<template>
  <BaseButton
    class="tiny circular compact"
    icon="redo alternate"
    :class="{
      basic: !isAudioLoop
    }"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState,
  mapActions
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'LoopButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      audioStore,
      {
        isAudioLoop: 'isLoop',
        audioElement: 'element'
      }
    )
  },
  methods: {
    ...mapActions(
      audioStore,
      {
        setIsAudioLoop: 'setIsLoop'
      }
    ),
    handleClick () {
      const value = !this.isAudioLoop

      this.audioElement.loop = value

      this.setIsAudioLoop(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
