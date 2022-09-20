<template>
  <div class="main-settings-options-block">
    <PlayingOption />
  </div>
</template>

<script>
import PlayingOption from './PlayerOptions/PlayingOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    PlayingOption
  }
}
</script>

<style lang="sass" scoped></style>
