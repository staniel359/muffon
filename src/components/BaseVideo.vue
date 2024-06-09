<template>
  <div
    class="base-video overflow-hidden border-radius border-inner"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div
      :key="key"
      class="ui embed"
    >
      <div
        :id="playerId"
      />
    </div>
  </div>
</template>

<script>
import 'https://www.youtube.com/iframe_api'
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import videoStore from '@/stores/video'
import audioStore from '@/stores/audio'
import profileStore from '@/stores/profile'
import playerStore from '@/stores/player'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseVideo',
  props: {
    videoData: {
      type: Object,
      required: true
    },
    isWithAutoplay: Boolean
  },
  data () {
    return {
      player: null,
      status: null,
      key: null,
      playerId: 'player',
      playingStatuses: [
        'UNSTARTED',
        'PLAYING'
      ]
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      videoStore,
      {
        isVideoAutoplay: 'isAutoplay',
        isPauseVideoOnAudioPlay: 'isPauseOnAudioPlay'
      }
    ),
    ...mapState(
      audioStore,
      {
        audioElement: 'element',
        audioStatus: 'status'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    ...mapState(
      playerStore,
      {
        isPauseAudioOnVideoPlay: 'isPauseOnVideoPlay'
      }
    ),
    isAutoplay () {
      return (
        this.isWithAutoplay &&
          this.isVideoAutoplay
      )
    },
    playerStates () {
      return Object.fromEntries(
        Object.entries(
          YT.PlayerState
        ).map(
          e => e.reverse()
        )
      )
    },
    playerOptions () {
      return {
        videoId: this.videoId,
        playerVars: this.playerArgs,
        events: this.playerEvents
      }
    },
    videoId () {
      return this.videoData.source.id
    },
    playerArgs () {
      return {
        autoplay: this.autoplayOption,
        hl: this.profileLanguage
      }
    },
    autoplayOption () {
      return (
        this.isAutoplay ? 1 : 0
      )
    },
    playerEvents () {
      return {
        onStateChange:
          this.handlePlayerStateChange
      }
    },
    isPlaying () {
      return this.playingStatuses.includes(
        this.status
      )
    },
    isAudioPlaying () {
      return (
        this.audioStatus === 'play'
      )
    },
    isPauseOnAudioPlay () {
      return (
        this.isPauseVideoOnAudioPlay &&
          this.isAudioPlaying
      )
    },
    isPauseAudioOnPlay () {
      return (
        this.isPauseAudioOnVideoPlay &&
          this.isPlaying
      )
    }
  },
  watch: {
    isPlaying:
      'handleIsPlayingChange',
    audioStatus:
      'handleAudioStatusChange',
    playerArgs:
      'handlePlayerArgsChange',
    isPauseOnAudioPlay:
      'handleIsPauseOnAudioPlayChange',
    isPauseAudioOnPlay:
      'handleIsPauseAudioOnPlayChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    handleIsPlayingChange () {
      this.pauseAudioIfPlaying()
    },
    handleAudioStatusChange () {
      this.pauseIfAudioPlaying()
    },
    handlePlayerArgsChange () {
      this.reload()
    },
    handlePlayerStateChange (
      event
    ) {
      this.status =
        this.playerStates[
          event.data
        ]
    },
    handleIsPauseOnAudioPlayChange () {
      this.pauseIfAudioPlaying()
    },
    handleIsPauseAudioOnPlayChange () {
      this.pauseAudioIfPlaying()
    },
    initialize () {
      this.player =
        new YT.Player(
          this.playerId,
          this.playerOptions
        )
    },
    pauseIfAudioPlaying () {
      if (this.isPauseOnAudioPlay) {
        this.pauseVideo()
      }
    },
    pauseAudioIfPlaying () {
      if (this.isPauseAudioOnPlay) {
        this.pauseAudio()
      }
    },
    playVideo () {
      this.player.playVideo()
    },
    pauseVideo () {
      this.player.pauseVideo()
    },
    pauseAudio () {
      this.audioElement.pause()
    },
    async reload () {
      this.key = generateKey()

      await this.$nextTick()

      this.initialize()
    }
  }
}
</script>

<style lang="sass" scoped></style>
