<template>
  <div>
    <ShuffleButton />

    <LoopButton />
  </div>
</template>

<script>
import ShuffleButton from './ActionsBlock/ShuffleButton.vue'
import LoopButton from './ActionsBlock/LoopButton.vue'

export default {
  name: 'ActionsBlock',
  components: {
    ShuffleButton,
    LoopButton
  }
}
</script>

<style lang="sass" scoped></style>
