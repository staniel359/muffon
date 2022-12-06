<template>
  <div id="the-discord-observer" />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  client as discordClient,
  login as loginDiscordClient
} from '@/plugins/discordRPC'
import {
  homepage
} from '@/helpers/data/links'

export default {
  name: 'TheDiscordObserver',
  data () {
    return {
      isConnected: false,
      appName: 'muffon'
    }
  },
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    activity () {
      return {
        details: this.trackTitle,
        state: this.artistName,
        startTimestamp: Date.now(),
        largeImageText: this.albumTitle,
        smallImageText: this.appName,
        largeImageKey: this.image,
        smallImageKey: 'logo',
        buttons: this.buttons
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
    buttons () {
      return [
        this.downloadButtonData
      ]
    },
    downloadButtonData () {
      return {
        label: this.appName,
        url: homepage
      }
    }
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange'
  },
  mounted () {
    loginDiscordClient()
      .then(
        this.handleLoginSuccess
      ).catch(
        this.handleError
      )
  },
  beforeUnmount () {
    if (this.isConnected) {
      this.resetActivity()
    }
  },
  methods: {
    handleLoginSuccess () {
      this.isConnected = true

      this.updateActivity()
    },
    handleError () {
      return null
    },
    handlePlayerPlayingChange () {
      if (this.isConnected) {
        this.updateActivity()
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
      discordClient
        .setActivity(
          this.activity
        ).catch(
          this.handleError
        )
    },
    resetActivity () {
      discordClient.clearActivity()
    }
  }
}
</script>

<style lang="sass" scoped></style>
