<template>
  <div class="main-settings-options-block">
    <RichPresenceOption />
  </div>
</template>

<script>
import RichPresenceOption from './DiscordOptions/RichPresenceOption.vue'

export default {
  name: 'DiscordOptions',
  components: {
    RichPresenceOption
  }
}
</script>

<style lang="sass" scoped></style>
