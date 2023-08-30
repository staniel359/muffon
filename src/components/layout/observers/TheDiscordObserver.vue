<template>
  <div
    id="the-discord-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'pinia'
import i18n from '@/plugins/i18n'
import discordStore from '@/stores/discord'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import {
  homepage
} from '@/../package.json'

export default {
  name: 'TheDiscordObserver',
  data () {
    return {
      isConnected: false,
      buttonsTextData: (
        i18n
          .global
          .messages
          .en
          .settings
          .options
          .connections
          .discord
          .richPresence
          .buttons
          .options
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
      playerStore,
      {
        playerPlaying: 'playing',
        isPlayerWithDiscordRichPresence:
          'isWithDiscordRichPresence'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileConnections: 'connections',
        profileId: 'id'
      }
    ),
    activityDataFormatted () {
      return JSON.stringify(
        this.activityData
      )
    },
    activityData () {
      if (this.playerPlaying) {
        return {
          playingData:
            this.playingData,
          buttons:
            this.buttonsFiltered
        }
      } else {
        return null
      }
    },
    playingData () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        image: this.image,
        duration: this.duration
      }
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    image () {
      return this.playerPlaying.image?.medium
    },
    duration () {
      return this.playerPlaying.duration
    },
    buttonsFiltered () {
      return this.buttonsFormatted.filter(
        e => e
      )
    },
    buttonsFormatted () {
      return this.discordRichPresenceButtons.map(
        this.formatButton
      )
    },
    buttons () {
      return [
        {
          id: 'downloadApp',
          link: homepage
        },
        {
          id: 'listenTrack',
          link:
            this.playingExternalLink
        },
        {
          id: 'lastfmProfile',
          isDisabled:
            !this.lastfmConnection,
          link:
            this.lastfmProfileLink
        },
        {
          id: 'spotifyProfile',
          isDisabled:
            !this.spotifyConnection,
          link:
            this.spotifyProfileLink
        },
        {
          id: 'muffonProfile',
          link:
            this.muffonProfileLink
        }
      ]
    },
    playingExternalLink () {
      return (
        this.playingStreamingLink ||
          this.playingOriginalLink
      )
    },
    playingStreamingLink () {
      return this.playingSourceLinks.streaming
    },
    playingSourceLinks () {
      return this.playerPlaying.source.links
    },
    playingOriginalLink () {
      return this.playingSourceLinks.original
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
    },
    lastfmProfileLink () {
      if (this.lastfmConnection) {
        return (
          `https://www.last.fm/user/${this.lastfmNickname}`
        )
      } else {
        return null
      }
    },
    lastfmNickname () {
      return this.lastfmConnection.nickname
    },
    spotifyConnection () {
      return this.profileConnections.spotify
    },
    spotifyProfileLink () {
      if (this.spotifyConnection) {
        return (
          `https://open.spotify.com/user/${this.spotifyId}`
        )
      } else {
        return null
      }
    },
    spotifyId () {
      return this.spotifyConnection.spotify_id
    },
    muffonProfileLink () {
      return `muffon://profiles/${this.profileId}`
    }
  },
  watch: {
    isPlayerWithDiscordRichPresence: {
      immediate: true,
      handler:
        'handleIsPlayerWithDiscordRichPresenceChange'
    },
    isConnected: 'handleIsConnectedChange',
    activityData:
      'handleActivityDataChange'
  },
  mounted () {
    ipcRenderer.on(
      'discord-connected',
      this.handleDiscordConnected
    )

    ipcRenderer.on(
      'discord-disconnected',
      this.handleDiscordDisconnected
    )
  },
  methods: {
    handleDiscordConnected () {
      this.isConnected = true
    },
    handleDiscordDisconnected () {
      this.isConnected = false
    },
    handleIsPlayerWithDiscordRichPresenceChange (
      value
    ) {
      if (value) {
        this.connect()
      } else {
        this.disconnect()
      }
    },
    handleIsConnectedChange (
      value
    ) {
      if (value) {
        this.updateActivity()
      }
    },
    handleActivityDataChange () {
      if (this.isConnected) {
        this.updateActivity()
      }
    },
    connect () {
      if (!this.isConnected) {
        ipcRenderer.send(
          'connect-discord'
        )
      }
    },
    disconnect () {
      if (this.isConnected) {
        this.resetActivity()

        ipcRenderer.send(
          'disconnect-discord'
        )
      }
    },
    updateActivity () {
      if (this.playerPlaying) {
        this.setActivity()
      } else {
        this.resetActivity()
      }
    },
    setActivity () {
      ipcRenderer.send(
        'set-discord-activity',
        this.activityDataFormatted
      )
    },
    resetActivity () {
      ipcRenderer.send(
        'reset-discord-activity'
      )
    },
    formatButton (
      id
    ) {
      function isMatchedButton (
        buttonData
      ) {
        return (
          buttonData.id === id
        )
      }

      const matchedButtonData =
        this.buttons.find(
          isMatchedButton
        )

      if (matchedButtonData) {
        const {
          id,
          link,
          isDisabled
        } = matchedButtonData

        if (!isDisabled) {
          const label =
            this.buttonsTextData[id]

          return {
            label,
            url: link
          }
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
