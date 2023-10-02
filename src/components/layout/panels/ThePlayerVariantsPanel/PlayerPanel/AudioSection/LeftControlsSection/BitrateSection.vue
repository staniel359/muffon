<template>
  <BaseItemContainer>
    <div class="content">
      <BaseIcon
        v-if="isLoading"
        is-loading
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
  ipcRenderer
} from 'electron'
import axios from 'axios'
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
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
  async mounted () {
    await this.$nextTick()

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
