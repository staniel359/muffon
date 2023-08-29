<template>
  <div class="main-settings-options-block">
    <RichPresenceOption />

    <RichPresenceButtonsOption />
  </div>
</template>

<script>
import RichPresenceOption from './DiscordOptions/RichPresenceOption.vue'
import RichPresenceButtonsOption
  from './DiscordOptions/RichPresenceButtonsOption.vue'

export default {
  name: 'DiscordOptions',
  components: {
    RichPresenceOption,
    RichPresenceButtonsOption
  }
}
</script>

<style lang="sass" scoped></style>
