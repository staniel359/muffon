<template>
  <BaseIcon
    :isLoading="isLoading"
    :isError="isError"
    :icon="icon"
  />
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'
import { mapGetters } from 'vuex'

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
    ...mapGetters('audio', {
      audioAction: 'action'
    }),
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
