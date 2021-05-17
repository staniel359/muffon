<template>
  <div class="the-player-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import {
  formatTitle as formatPlayerTitle,
  formatMetadata as formatPlayerMetadata
} from '#/actions/player'
import { setTrayTooltip as setElectronTrayTooltip } from '#/actions/electron'

export default {
  name: 'ThePlayerObserver',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    ...mapState('audio', {
      audioStatus: 'status'
    }),
    title () {
      return formatPlayerTitle()
    }
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange',
    audioStatus: 'handleAudioStatusChange'
  },
  methods: {
    handlePlayerPlayingChange () {
      this.changeTitle()
      this.changeMediaMetadata()
    },
    handleAudioStatusChange () {
      this.changeTitle()
    },
    changeTitle () {
      document.title = this.title

      setElectronTrayTooltip(this.title)
    },
    changeMediaMetadata () {
      navigator.mediaSession.metadata = formatPlayerMetadata()
    }
  }
}
</script>

<style lang="sass" scoped></style>
