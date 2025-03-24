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
import BaseOption from '@/components/popups/options/BaseOption.vue'
import notificationMixin from '@/mixins/notificationMixin'
import getAudio from '@/helpers/actions/api/audio/get'

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
    saveText () {
      return this.$t(
        'actions.addTo.savedTracks'
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
    },
    isAudioLinkPresent () {
      return this.trackData.audio?.link
    }
  },
  watch: {
    savedTrackData:
      'handleSavedTrackDataChange'
  },
  methods: {
    async handleClick () {
      this.isLoading = true
      this.isError = false

      const trackData =
        await this.getTrackData()

      if (trackData) {
        const trackDataFormatted =
          JSON.stringify(
            trackData
          )

        window
          .mainProcess
          .sendAsyncCommand(
            'save-audio-file',
            {
              trackData:
                trackDataFormatted
            }
          ).then(
            this.handleSaveAudioComplete
          ).catch(
            this.handleSaveAudioError
          )
      }
    },
    handleSaveAudioComplete (
      trackData
    ) {
      this.savedTrackData = trackData
    },
    handleSaveAudioError () {
      this.isLoading = false
      this.isError = true
    },
    handleTrackAudioDataError () {
      this.isLoading = false
      this.isError = true
    },
    async handleSavedTrackDataChange (
      value
    ) {
      if (value) {
        await this.setSavedTracks()

        this.isLoading = false

        this.notifySuccess()
      }
    },
    getTrackData () {
      if (this.isAudioLinkPresent) {
        return this.trackData
      } else {
        return getAudio(
          {
            trackData: this.trackData,
            isSetPlayerPlaying: false
          }
        ).catch(
          this.handleTrackAudioDataError
        )
      }
    },
    setSavedTracks () {
      const savedTrackDataFormatted =
        JSON.stringify(
          this.savedTrackData
        )

      return window
        .mainProcess
        .sendAsyncCommand(
          'add-electron-store-value',
          'profile.savedTracks',
          savedTrackDataFormatted
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
