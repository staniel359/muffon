<template>
  <BaseButton
    class="basic circular"
    left-icon="discord"
    text="Discord"
    is-left-icon-colored
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  discord as discordLink
} from '@/helpers/data/externalLinks'

export default {
  name: 'DiscordButtonSection',
  components: {
    BaseButton
  },
  methods: {
    handleClick () {
      window
        .mainProcess
        .openExternalLink(
          discordLink
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
