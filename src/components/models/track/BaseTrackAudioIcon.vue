<template>
  <BaseIcon
    :is-loading="isLoading"
    :is-error="isError"
    :icon="icon"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'

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
    ...mapGetters(
      'audio',
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
