<template>
  <BaseButton
    class="big basic circular compact simple"
    :class="{
      disabled: !isAudioPlayable
    }"
    :icon="audioActionIcon"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'PlayButton',
  components: {
    BaseButton
  },
  data () {
    return {
      audioActionIcons: {
        play: 'audioPlay',
        pause: 'audioPause'
      }
    }
  },
  computed: {
    ...mapState(
      audioStore,
      {
        isAudioPlayable: 'isPlayable',
        audioElement: 'element',
        audioAction: 'action'
      }
    ),
    audioActionIcon () {
      return this.audioActionIcons[
        this.audioAction
      ]
    }
  },
  methods: {
    handleClick () {
      this.callAudioAction()
    },
    callAudioAction () {
      this.audioElement[
        this.audioAction
      ]()
    }
  }
}
</script>

<style lang="sass" scoped></style>
