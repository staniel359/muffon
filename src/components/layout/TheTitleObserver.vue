<template>
  <div id="the-title-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import { formatTitle as formatPlayerTitle } from '#/actions/player'
import { setTrayTooltip as setElectronTrayTooltip } from '#/actions/electron'

export default {
  name: 'TheTitleObserver',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    ...mapState('audio', {
      audioStatus: 'status'
    })
  },
  watch: {
    playerPlaying: 'handlePlayerTitleChange',
    audioStatus: 'handlePlayerTitleChange'
  },
  methods: {
    handlePlayerTitleChange () {
      const title = formatPlayerTitle()

      document.title = title

      setElectronTrayTooltip(title)
    }
  }
}
</script>

<style lang="sass" scoped></style>
