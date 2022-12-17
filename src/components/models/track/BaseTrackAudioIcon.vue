<template>
  <BaseIcon
    :is-loading="isLoading"
    :is-error="isError"
    :icon="icon"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseTrackAudioIcon',
  components: {
    BaseIcon
  },
  props: {
    isLoading: Boolean,
    isError: Boolean,
    isCurrent: Boolean
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
        audioAction: 'action'
      }
    ),
    icon () {
      if (this.isCurrent) {
        return this.audioActionIcon
      } else {
        return 'play'
      }
    },
    audioActionIcon () {
      return this.audioActionIcons[
        this.audioAction
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
