<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="buttonsText"
      />

      <div>
        <ButtonSelectSection
          index-text="first"
          :options="optionsFormatted"
          :buttons-text-key="buttonsTextKey"
          :index="0"
          :other-select-index="1"
        />

        <ButtonSelectSection
          index-text="second"
          :options="optionsFormatted"
          :buttons-text-key="buttonsTextKey"
          :index="1"
          :other-select-index="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import discordStore from '@/stores/discord'
import profileStore from '@/stores/profile'
import BaseHeader from '@/components/BaseHeader.vue'
import ButtonSelectSection
  from './RichPresenceButtonsOption/ButtonSelectSection.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'RichPresenceButtonsOption',
  components: {
    BaseHeader,
    ButtonSelectSection
  },
  provide () {
    return {
      updateButton:
        this.updateButton
    }
  },
  data () {
    return {
      buttonsTextKey: (
        'settings.options.connections' +
        '.discord.richPresence.buttons'
      )
    }
  },
  computed: {
    ...mapState(
      discordStore,
      {
        discordRichPresenceButtons:
          'richPresenceButtons'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections'
      }
    ),
    buttonsText () {
      return this.$t(
        `${this.buttonsTextKey}.header`
      )
    },
    optionsFormatted () {
      return this.options.map(
        this.formatOption
      )
    },
    options () {
      return [
        {
          id: 'downloadApp'
        },
        {
          id: 'listenTrack'
        },
        {
          id: 'lastfmProfile',
          isDisabled:
            !this.lastfmConnection
        },
        {
          id: 'spotifyProfile',
          isDisabled:
            !this.spotifyConnection
        },
        {
          id: 'muffonProfile'
        }
      ]
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
    },
    spotifyConnection () {
      return this.profileConnections.spotify
    }
  },
  methods: {
    formatOption (
      optionData
    ) {
      const {
        id,
        isDisabled
      } = optionData

      const name =
        this.$t(
          `${this.buttonsTextKey}.options.${id}`
        )

      return {
        id,
        name,
        isDisabled
      }
    },
    updateButton (
      index,
      value
    ) {
      const buttons = [
        ...this.discordRichPresenceButtons
      ]

      buttons[index] = value

      updateGlobalStore(
        {
          'discord.richPresenceButtons': buttons
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
