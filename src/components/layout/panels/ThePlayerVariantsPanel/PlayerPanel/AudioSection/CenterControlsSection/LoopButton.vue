<template>
  <BaseButton
    class="circular compact simple"
    icon="audioLoop"
    :class="buttonClass"
    :is-invertable="!isActive"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'LoopButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      audioStore,
      {
        isAudioLoop: 'isLoop'
      }
    ),
    isActive () {
      return this.isAudioLoop
    },
    buttonClass () {
      if (this.isActive) {
        return 'primary'
      } else {
        return 'basic'
      }
    }
  },
  methods: {
    handleClick () {
      this.toggleAudioLoop()
    },
    toggleAudioLoop () {
      updateGlobalStore(
        {
          'audio.isLoop':
            !this.isAudioLoop
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
