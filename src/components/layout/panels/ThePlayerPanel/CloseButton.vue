<template>
  <BaseClearButton
    @click="handleClick"
  />
</template>

<script>
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import { updateStore } from '*/helpers/actions'

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
