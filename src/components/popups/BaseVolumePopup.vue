<template>
  <BaseSegmentContainer
    class="blurred main-popup-content-container"
  >
    <div class="volume-header-container">
      <BaseHeader
        tag="h4"
        :text="volumeText"
      />
    </div>

    <BaseSeeker
      ref="seeker"
      class="vertical reversed volume-seeker"
      :options="seekerOptions"
      @move="handleMove"
      @mouse-up="handleMouseUp"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  mainVolumeSeekerOptions
} from '@/helpers/formatters/plugins/semantic'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'BaseVolumePopup',
  components: {
    BaseSegmentContainer,
    BaseHeader,
    BaseSeeker
  },
  computed: {
    ...mapState(
      audioStore,
      {
        audioVolume: 'volume',
        audioElement: 'element'
      }
    ),
    volumeText () {
      return Math.floor(
        this.audioVolume * 100
      ).toString()
    },
    seekerOptions () {
      return mainVolumeSeekerOptions(
        {
          start: this.audioVolume
        }
      )
    }
  },
  watch: {
    audioVolume: {
      immediate: true,
      handler: 'handleAudioVolumeChange'
    }
  },
  methods: {
    handleMove (
      value
    ) {
      this.setAudioVolume(
        value
      )
    },
    handleMouseUp (
      value
    ) {
      updateGlobalStore(
        {
          'audio.volume': value
        }
      )
    },
    async handleAudioVolumeChange (
      value
    ) {
      await this.$nextTick()

      this.setAudioVolume(
        value
      )

      this.setSeekerValue(
        value
      )
    },
    setAudioVolume (
      value
    ) {
      this.audioElement.volume = value
    },
    setSeekerValue (
      value
    ) {
      this.$refs
        .seeker
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped>
.volume-header-container
  margin-bottom: 0.35em

.volume-seeker
  @extend .w-100, .d-flex, .justify-content-center
  height: 120px !important
  padding: 5px 0 !important
</style>
