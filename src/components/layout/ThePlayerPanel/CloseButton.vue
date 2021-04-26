<template>
  <BaseButton
    class="circular red tiny basic compact close-button"
    icon="close"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import { stopAndClose as stopAndClosePlayer } from '#/actions/player'

export default {
  name: 'CloseButton',
  components: {
    BaseButton
  },
  methods: {
    handleClick () {
      stopAndClosePlayer()
    }
  }
}
</script>

<style lang="sass" scoped>
.close-button
  @extend .no-shadow, .no-margin
</style>
