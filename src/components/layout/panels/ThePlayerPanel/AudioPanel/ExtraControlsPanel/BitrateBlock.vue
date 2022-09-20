<template>
  <BaseListContainer
    class="bitrate-block"
  >
    <div class="item">
      <div class="content">
        <small class="description">
          <div
            v-if="isLoading"
            class="ui mini active inline loader"
          />
          <div
            v-else-if="bitrate"
            v-text="bitrateText"
          />
        </small>
      </div>
    </div>
  </BaseListContainer>
</template>

<script>
import fs from 'fs'
import {
  mapState
} from 'vuex'
import axios from 'axios'
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'

export default {
  name: 'BitrateBlock',
  components: {
    BaseListContainer
  },
  data () {
    return {
      audioSize: null,
      isLoading: true
    }
  },
  computed: {
    ...mapState(
      'player',
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
      return this.playerPlaying.duration_seconds
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
    if (this.audioLocal) {
      this.getLocalAudioBitrate()
    } else {
      this.getRemoteAudioBitrate()
    }
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
    getLocalAudioBitrate () {
      this.audioSize =
        fs.statSync(
          this.audioPath
        ).size
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

<style lang="sass" scoped>
.bitrate-block
  @extend .flex-full, .text-align-center
  margin: 0 0.5em
</style>
