<template>
  <BaseButton
    class="tiny compact"
    icon="redo alternate"
    :class="{ basic: !isAudioLoop }"
    @click="handleClick"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from '@/BaseButton.vue'
import { toggleIsLoop as toggleIsAudioLoop } from '#/actions/audio'

export default {
  name: 'LoopButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('audio', {
      isAudioLoop: 'isLoop'
    })
  },
  methods: {
    handleClick () {
      toggleIsAudioLoop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
