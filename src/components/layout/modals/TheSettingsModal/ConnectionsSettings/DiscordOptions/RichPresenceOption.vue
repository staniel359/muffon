<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="headerText"
      />

      <BaseToggle
        store-key="player.isWithDiscordRichPresence"
        :is-checked="isPlayerWithDiscordRichPresence"
      />
    </div>

    <div class="main-bottom-section">
      <BaseMessage
        icon="infoCircle"
        :content="messageText"
        is-icon-small
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import BaseMessage from '@/components/messages/BaseMessage.vue'

export default {
  name: 'RichPresenceOption',
  components: {
    BaseHeader,
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
    headerText () {
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
