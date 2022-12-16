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
  computed: {
    ...mapState(
      audioStore,
      {
        audioAction: 'action'
      }
    ),
    icon () {
      if (this.isCurrent) {
        return this.audioAction
      } else {
        return 'play'
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
