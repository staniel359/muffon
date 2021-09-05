<template>
  <BaseClearButton
    @click="handleClick"
  />
</template>

<script>
import BaseClearButton from '@/BaseClearButton.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'CloseButton',
  components: {
    BaseClearButton
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

<style lang="sass" scoped></style>
