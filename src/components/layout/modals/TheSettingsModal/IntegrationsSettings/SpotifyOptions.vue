<template>
  <div class="main-settings-options-block">
    <ConnectOption />
  </div>
</template>

<script>
import ConnectOption from './SpotifyOptions/ConnectOption.vue'

export default {
  name: 'SpotifyOptions',
  components: {
    ConnectOption
  }
}
</script>

<style lang="sass" scoped></style>
