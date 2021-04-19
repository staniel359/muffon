<template>
  <i
    class="icon"
    :class="icon"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    ></div>
  </i>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseTrackAudioIcon',
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
      if (this.isLoading) {
        return null
      } else if (this.isError) {
        return 'close'
      } else if (this.isCurrent) {
        return this.audioAction
      } else {
        return 'play'
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
