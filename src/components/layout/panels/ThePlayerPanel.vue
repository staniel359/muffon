<template>
  <VariantsPanel
    v-if="isRenderVariantsPanel"
  />

  <div
    class="ui bottom overlay segment sidebar the-player-panel"
    ref="playerPanel"
  >
    <div class="ui container main-container">
      <PlayingPanel />
      <AudioPanel />
      <CloseButton />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VariantsPanel from './ThePlayerPanel/VariantsPanel.vue'
import PlayingPanel from './ThePlayerPanel/PlayingPanel.vue'
import AudioPanel from './ThePlayerPanel/AudioPanel.vue'
import CloseButton from './ThePlayerPanel/CloseButton.vue'
import {
  setPlayerPanel,
  showPlayerPanel,
  hidePlayerPanel
} from '#/actions/layout'
import { updateStore } from '#/actions'
import { mainSidebarOptions } from '#/data/plugins/semantic'
import { toggleClass } from '#/actions/plugins/jquery'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'ThePlayerPanel',
  components: {
    VariantsPanel,
    PlayingPanel,
    AudioPanel,
    CloseButton
  },
  data () {
    return {
      isVisible: false
    }
  },
  computed: {
    ...mapState('player', {
      isPlayerScrobbled: 'isScrobbled',
      isPlayerWithScrobbleNotifications: 'isWithScrobbleNotifications',
      playerPlaying: 'playing'
    }),
    ...mapState('layout', [
      'isDarkMode'
    ]),
    ...mapGetters('player', {
      playerVariantsCount: 'variantsCount'
    }),
    isRenderVariantsPanel () {
      return (
        this.isVisible &&
          this.playerVariantsCount
      )
    },
    playerPanelOptions () {
      return mainSidebarOptions({
        onShow: this.handleShow,
        onHide: this.handleHide
      })
    },
    scrobbledMessage () {
      return this.$t(
        'shared.player.scrobbled',
        { trackFullTitle: this.trackFullTitleFormatted }
      )
    },
    trackFullTitleFormatted () {
      return `<strong>${this.trackFullTitle}</strong>`
    },
    trackFullTitle () {
      return `${this.trackTitle} - ${this.artistName}`
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    artistName () {
      return this.playerPlaying.artist.name
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isPlayerScrobbled: 'handleIsPlayerScrobbledChange',
    isDarkMode: {
      immediate: true,
      handler: 'handleIsDarkModeChange'
    }
  },
  mounted () {
    setPlayerPanel(
      this.$refs.playerPanel,
      this.playerPanelOptions
    )
  },
  methods: {
    ...mapActions('audio', {
      setIsAudioLoop: 'setIsLoop'
    }),
    handlePlayerPlayingChange (value) {
      if (value) {
        this.$nextTick(() => {
          showPlayerPanel()
        })
      } else {
        this.clearPlayer()

        hidePlayerPanel()
      }

      this.setIsAudioLoop(false)
    },
    handleIsDarkModeChange () {
      this.$nextTick(() => {
        this.toggleInvertedClass()
      })
    },
    handleShow () {
      this.isVisible = true
    },
    handleHide () {
      this.isVisible = false
    },
    handleIsPlayerScrobbledChange (value) {
      if (this.isPlayerWithScrobbleNotifications && value) {
        setToast({
          message: this.scrobbledMessage,
          icon: 'green check'
        })
      }
    },
    toggleInvertedClass () {
      toggleClass(
        this.$refs.playerPanel,
        'inverted',
        this.isDarkMode
      )
    },
    clearPlayer () {
      updateStore({
        'player.currentTrackId': null,
        'player.currentVariantId': null,
        'player.variants': []
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.the-player-panel
  @extend .no-padding, .no-border
  overflow: visible !important
  z-index: 200 !important
  &.inverted
    border-top: $borderInverted !important

.main-container
  @extend .d-flex, .align-items-center
  height: $playerPanelHeight
</style>
