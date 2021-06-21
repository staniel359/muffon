<template>
  <BaseButton
    class="circular red tiny basic compact close-button"
    icon="close"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'CloseButton',
  components: {
    BaseButton
  },
  methods: {
    handleClick () {
      setGlobalData({
        'player.playing': null
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.close-button
  @extend .no-shadow, .no-margin
</style>
