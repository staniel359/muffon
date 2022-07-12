<template>
  <BaseButton
    class="basic tiny compact"
    :class="{
      loading: isLoading,
      disabled: isDisabled
    }"
    :icon="icon"
    @click="handleClick"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '*/plugins/electronStore'
import {
  mapState
} from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'
import {
  setToast
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'SaveButton',
  components: {
    BaseButton
  },
  data () {
    return {
      trackData: null,
      isLoading: false,
      isError: false
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'tabId'
      ]
    ),
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    isDisabled () {
      return (
        !this.playerPlaying ||
          this.isLoading ||
          this.isPlayerPlayingAudioLocal
      )
    },
    isPlayerPlayingAudioLocal () {
      return !!this.playerPlaying?.audio?.local
    },
    playerPlayingString () {
      return JSON.stringify(
        this.playerPlaying
      )
    },
    icon () {
      if (this.isError) {
        return 'close'
      } else {
        return 'save'
      }
    },
    addedMessage () {
      return this.$t(
        'notifications.added.savedTracks.track',
        {
          trackFullTitle:
            this.trackFullTitleStrong
        }
      )
    },
    trackFullTitleStrong () {
      return `<strong>${this.trackFullTitle}</strong>`
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  mounted () {
    ipcRenderer.on(
      'save-audio-complete',
      this.handleSaveAudioComplete
    )

    ipcRenderer.on(
      'save-audio-error',
      this.handleSaveAudioError
    )
  },
  methods: {
    handleClick () {
      this.isLoading = true
      this.isError = false

      ipcRenderer.send(
        'save-audio',
        {
          track: this.playerPlayingString,
          tabId: this.tabId
        }
      )
    },
    handleSaveAudioComplete (
      _,
      {
        trackData
      }
    ) {
      this.trackData = trackData
    },
    handleSaveAudioError () {
      this.isLoading = false
      this.isError = true
    },
    handleTrackDataChange (
      value
    ) {
      if (value) {
        this.isLoading = false

        this.setSavedTracks()

        this.notify()
      }
    },
    setSavedTracks () {
      const tracks =
        electronStore.get(
          'profile.savedTracks'
        )

      const newTracks = [
        ...tracks,
        this.trackData
      ]

      electronStore.set(
        {
          'profile.savedTracks': newTracks
        }
      )
    },
    notify () {
      setToast(
        {
          message: this.addedMessage,
          icon: 'green check'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
