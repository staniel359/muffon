<template>
  <BaseButton
    class="basic"
    :class="{ disabled: !isAudioPlayable }"
    :icon="audioAction"
    @click="handleClick"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'PlayButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('audio', {
      isAudioPlayable: 'isPlayable',
      audioElement: 'element'
    }),
    ...mapGetters('audio', {
      audioAction: 'action'
    })
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
