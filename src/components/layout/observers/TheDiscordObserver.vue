<template>
  <div
    id="the-discord-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import discordStore from '@/stores/discord'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import audioStore from '@/stores/audio'
import {
  homepage
} from '@/../package.json'
import {
  track as defaultImage
} from '@/helpers/data/defaultImages'
import {
  buttonsTexts
} from '@/helpers/data/discord'
import {
  main as formatTrackLink
} from '@/helpers/formatters/links/track'
import formatRequestTrackData from '@/helpers/formatters/request/track/data'

export default {
  name: 'TheDiscordObserver',
  data () {
    return {
      playerPlayingStartTime: null,
      isConnected: false
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
    ...mapState(
      audioStore,
      {
        audioStatus: 'status'
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
          playingData: this.playingData,
          buttons: this.buttonsFiltered,
          startTime:
            this.playerPlayingStartTime,
          isPlaying: this.isPlaying
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
      return (
        this.playerPlaying.image?.medium ||
          defaultImage
      )
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
          link: this.playingExternalLink
        },
        {
          id: 'listenTrackMuffon',
          link: this.muffonTrackLink
        },
        {
          id: 'lastfmProfile',
          isDisabled:
            !this.lastfmConnection,
          link: this.lastfmProfileLink
        },
        {
          id: 'spotifyProfile',
          isDisabled:
            !this.spotifyConnection,
          link: this.spotifyProfileLink
        },
        {
          id: 'muffonProfile',
          link: this.muffonProfileLink
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
      return this.playingSourceData.links
    },
    playingSourceData () {
      return this.playerPlaying.source
    },
    playingOriginalLink () {
      return this.playingSourceLinks.original
    },
    lastfmConnection () {
      return this.profileConnections?.lastfm
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
      return this.profileConnections?.spotify
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
    },
    muffonTrackLink () {
      return `muffon://${this.playingPath}`
    },
    playingPath () {
      return formatTrackLink(
        {
          trackTitle: this.trackTitle,
          artistName: this.artistName,
          sourceParams:
            this.playingSourceParams
        }
      ).path
    },
    playingSourceParams () {
      return formatRequestTrackData(
        {
          trackData: this.playerPlaying
        }
      )
    },
    isPlaying () {
      return (
        this.audioStatus === 'play'
      )
    }
  },
  watch: {
    isPlayerWithDiscordRichPresence: {
      immediate: true,
      handler:
        'handleIsPlayerWithDiscordRichPresenceChange'
    },
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isConnected: 'handleIsConnectedChange',
    activityData: 'handleActivityDataChange'
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'discord-connected',
        this.handleDiscordConnected
      )

    window
      .mainProcess
      .addCommandHandler(
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
    handlePlayerPlayingChange (
      value
    ) {
      this.playerPlayingStartTime = (
        value ? Date.now() : null
      )
    },
    connect () {
      if (!this.isConnected) {
        window
          .mainProcess
          .sendCommand(
            'connect-discord'
          )
      }
    },
    disconnect () {
      if (this.isConnected) {
        this.resetActivity()

        window
          .mainProcess
          .sendCommand(
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
      window
        .mainProcess
        .sendCommand(
          'set-discord-activity',
          this.activityDataFormatted
        )
    },
    resetActivity () {
      window
        .mainProcess
        .sendCommand(
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
          const label = buttonsTexts[id]

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
