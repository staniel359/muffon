<template>
  <BaseSegmentContainer
    class="blurred main-popup-content-container"
  >
    <div class="main-top-extrasmall-section">
      <BaseHeader
        tag="h4"
        :text="volumeText"
      />
    </div>

    <BaseSeeker
      ref="seeker"
      class="vertical reversed base-volume-seeker width-100 center-aligned"
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
  volume as volumeSeekerOptions
} from '@/helpers/formatters/plugins/semantic/options/seeker'
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
      return volumeSeekerOptions(
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
.base-volume-seeker
  height: 130px !important
  padding: 5px 0 !important
</style>
