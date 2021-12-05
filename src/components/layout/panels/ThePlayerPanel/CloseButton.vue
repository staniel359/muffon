<template>
  <BaseClearButton
    @click="handleClick"
  />
</template>

<script>
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import { updateStore } from '#/actions'

export default {
  name: 'CloseButton',
  components: {
    BaseClearButton
  },
  methods: {
    handleClick () {
      updateStore({
        'player.playing': null
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
