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
  fetchFromUrl
} from 'music-metadata-browser'
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
      bitrate: null,
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
    audioLink () {
      return this.playerPlaying.audio.link
    },
    audioOptions () {
      return {
        skipCovers: true,
        skipPostHeaders: true
      }
    }
  },
  mounted () {
    this.getAudioBitrate()
  },
  methods: {
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
      return null
    },
    handleAudioFinish () {
      this.isLoading = false
    },
    getAudioBitrate () {
      fetchFromUrl(
        this.audioLink,
        this.audioOptions
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
