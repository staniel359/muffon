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
import { toggleAction as toggleAudioAction } from '#/actions/audio'

export default {
  name: 'PlayButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('audio', {
      isAudioPlayable: 'isPlayable'
    }),
    ...mapGetters('audio', {
      audioAction: 'action'
    })
  },
  methods: {
    handleClick () {
      toggleAudioAction()
    }
  }
}
</script>

<style lang="sass" scoped></style>
