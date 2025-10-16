<template>
  <BaseItemContainer>
    <div class="content">
      <BaseIcon
        v-if="isLoading"
        is-loading
      />
      <BaseIcon
        v-else-if="isError"
        icon="error"
      />
      <div
        v-else-if="bitrate"
        class="meta"
      >
        <small>
          <strong
            v-text="bitrateText"
          />
        </small>
      </div>
    </div>
  </BaseItemContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import audioStore from '@/stores/audio'
import BaseItemContainer
  from '@/components/containers/item/BaseItemContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BitrateSection',
  components: {
    BaseItemContainer,
    BaseIcon
  },
  data () {
    return {
      bitrate: null,
      isLoading: true,
      isError: false
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      audioStore,
      {
        isAudioStartedLoading: 'isStartedLoading'
      }
    ),
    bitrateText () {
      return this.$t(
        'player.audio.bitrate',
        {
          value: this.bitrate
        }
      )
    },
    audioLink () {
      return this.playerPlaying.audio.link
    }
  },
  watch: {
    isAudioStartedLoading: {
      immediate: true,
      handler: 'handleIsAudioStartedLoading'
    }
  },
  methods: {
    async handleIsAudioStartedLoading (
      value
    ) {
      await this.$nextTick()

      if (value) {
        this.getAudioBitrate()
      }
    },
    handleAudioSuccess (
      response
    ) {
      const {
        bitrate
      } = response.format

      const bitrateFormatted =
        Math.floor(
          bitrate / 1000
        )

      this.bitrate = bitrateFormatted
    },
    handleAudioError () {
      this.isError = true
    },
    handleAudioFinish () {
      this.isLoading = false
    },
    getAudioBitrate () {
      window
        .mainProcess
        .sendAsyncCommand(
          'read-remote-audio-file-metadata',
          {
            fileUrl: this.audioLink
          }
        ).then(
          this.handleAudioSuccess
        ).catch(
          this.handleAudioError
        ).finally(
          this.handleAudioFinish
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
