<template>
  <BaseOption
    icon="savedTrack"
    :text="saveText"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '#/plugins/electronStore'
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseOption from '@/components/dropdowns/options/BaseOption.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'SaveOption',
  components: {
    BaseOption
  },
  mixins: [
    notificationMixin
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      savedTrackData: null,
      isLoading: false,
      isError: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'tabId'
      ]
    ),
    saveText () {
      return this.$t(
        'actions.addTo.savedTracks'
      )
    },
    trackDataString () {
      return JSON.stringify(
        this.trackData
      )
    },
    notificationSuccessMessage () {
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
      return this.savedTrackData.artist.name
    },
    trackTitle () {
      return this.savedTrackData.title
    }
  },
  watch: {
    savedTrackData: 'handleSavedTrackDataChange'
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
          track: this.trackDataString,
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
      this.savedTrackData = trackData
    },
    handleSaveAudioError () {
      this.isLoading = false
      this.isError = true
    },
    handleSavedTrackDataChange (
      value
    ) {
      if (value) {
        this.isLoading = false

        this.setSavedTracks()

        this.notifySuccess()
      }
    },
    setSavedTracks () {
      const tracks =
        electronStore.get(
          'profile.savedTracks'
        )

      const newTracks = [
        ...tracks,
        this.savedTrackData
      ]

      electronStore.set(
        {
          'profile.savedTracks': newTracks
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
