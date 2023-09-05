<template>
  <div class="action-button-container">
    <BaseButton
      class="basic circular"
      icon="discord"
      text="Discord"
      @click="handleClick"
    />
  </div>
</template>

<script>
import {
  shell
} from 'electron'
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
      shell.openExternal(
        discordLink
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
