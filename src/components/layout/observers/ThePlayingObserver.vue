<template>
  <div
    id="the-playing-observer"
  />
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import updatePlaying from '@/helpers/actions/api/playing/update'

export default {
  name: 'ThePlayingObserver',
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      'profile',
      {
        isShowProfilePlaying: 'isShowPlaying'
      }
    ),
    playing () {
      if (this.isUpdatePlaying) {
        const {
          audio
        } = this.playerPlaying

        return {
          ...this.playerPlaying,
          audio: {
            present: audio.present
          }
        }
      } else {
        return null
      }
    },
    isUpdatePlaying () {
      return (
        this.playerPlaying &&
          this.isShowProfilePlaying
      )
    }
  },
  watch: {
    profileId: {
      immediate: true,
      handler: 'handleProfileIdChange'
    },
    playerPlaying: 'handlePlayerPlayingChange',
    isShowProfilePlaying:
      'handleIsShowProfilePlayingChange'
  },
  mounted () {
    ipcRenderer.on(
      'logout',
      this.handleLogout
    )

    ipcRenderer.on(
      'exit',
      this.handleExit
    )
  },
  methods: {
    handleLogout () {
      if (this.isUpdatePlaying) {
        updatePlaying(
          {
            playing: null
          }
        )
      }
    },
    handleExit () {
      if (this.isUpdatePlaying) {
        updatePlaying(
          {
            playing: null
          }
        )
      }
    },
    handleProfileIdChange (
      value
    ) {
      if (
        value &&
          this.isUpdatePlaying
      ) {
        updatePlaying(
          {
            playing: this.playing
          }
        )
      }
    },
    handlePlayerPlayingChange () {
      if (this.isShowProfilePlaying) {
        updatePlaying(
          {
            playing: this.playing
          }
        )
      }
    },
    handleIsShowProfilePlayingChange () {
      if (this.playerPlaying) {
        updatePlaying(
          {
            playing: this.playing
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
