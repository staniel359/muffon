<template>
  <BaseListContainer
    class="flex-full text-align-center no-margin"
  >
    <div class="item">
      <div class="content">
        <div class="description">
          <BaseIcon
            v-if="isLoading"
            is-loading
          />
          <small
            v-else-if="bitrate"
          >
            <strong
              v-text="bitrateText"
            />
          </small>
        </div>
      </div>
    </div>
  </BaseListContainer>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import axios from 'axios'
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BitrateSection',
  components: {
    BaseListContainer,
    BaseIcon
  },
  data () {
    return {
      audioSize: null,
      isLoading: true
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
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
    bitrate () {
      return Math.round(
        this.audioSize /
          128 /
          this.audioDuration
      )
    },
    audioDuration () {
      return this.playerPlaying.duration
    },
    audioLocal () {
      return this.playerPlaying.audio.local
    },
    audioPath () {
      return this.audioLocal.path
    },
    audioLink () {
      return this.playerPlaying.audio.link
    }
  },
  watch: {
    audioSize: 'handleAudioSizeChange'
  },
  mounted () {
    this.getAudioBitrate()
  },
  methods: {
    handleAudioSizeChange () {
      this.isLoading = false
    },
    handleRemoteAudioSuccess (
      response
    ) {
      this.audioSize =
        response.headers[
          'content-length'
        ]
    },
    handleRemoteAudioError () {
      this.audioSize = 0
    },
    getAudioBitrate () {
      if (this.audioLocal) {
        this.getLocalAudioBitrate()
      } else {
        this.getRemoteAudioBitrate()
      }
    },
    async getLocalAudioBitrate () {
      const details =
        await this.getLocalFileDetails()

      this.audioSize = details.size
    },
    getLocalFileDetails () {
      return ipcRenderer.invoke(
        'read-file-details',
        {
          filePath: this.audioPath
        }
      )
    },
    getRemoteAudioBitrate () {
      axios.get(
        this.audioLink
      ).then(
        this.handleRemoteAudioSuccess
      ).catch(
        this.handleRemoteAudioError
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
