<template>
  <BaseButton
    class="basic circular"
    :class="{
      disabled: !isAudioPlayable
    }"
    :icon="audioAction"
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
  computed: {
    ...mapState(
      audioStore,
      {
        isAudioPlayable: 'isPlayable',
        audioElement: 'element',
        audioAction: 'action'
      }
    )
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
