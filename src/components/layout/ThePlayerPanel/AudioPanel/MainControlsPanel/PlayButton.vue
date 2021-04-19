<template>
  <div
    class="ui basic icon button"
    :class="{ disabled: !isAudioPlayable }"
    @click="handleClick"
  >
    <i
      class="icon"
      :class="audioAction"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { toggleAction as toggleAudioAction } from '#/actions/audio'

export default {
  name: 'PlayButton',
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
