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
import hotkeys from 'hotkeys-js'
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
  mounted () {
    hotkeys(
      'space',
      this.handleSpacePress
    )
  },
  unmounted () {
    hotkeys.unbind(
      'space'
    )
  },
  methods: {
    handleClick () {
      this.callAudioAction()
    },
    handleSpacePress (
      event
    ) {
      event.preventDefault()

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
