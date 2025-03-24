<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isWithDiscordRichPresence"
        :is-checked="isPlayerWithDiscordRichPresence"
      />
    </div>

    <div class="main-bottom-section">
      <BaseMessage
        :content="messageText"
        is-info
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import BaseMessage from '@/components/messages/BaseMessage.vue'

export default {
  name: 'RichPresenceOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle,
    BaseMessage
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithDiscordRichPresence:
          'isWithDiscordRichPresence'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.connections.discord.richPresence.header'
      )
    },
    messageText () {
      return this.$t(
        'settings.options.connections.discord.richPresence.client'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
