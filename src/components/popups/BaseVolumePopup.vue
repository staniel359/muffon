<template>
  <div
    class="ui popup main-popup main-volume-popup"
    :class="{
      inverted: isDarkMode
    }"
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
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  mainVolumeSeekerOptions
} from '@/helpers/data/plugins/semantic'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'BaseVolumePopup',
  components: {
    BaseHeader,
    BaseSeeker
  },
  computed: {
    ...mapState(
      'audio',
      {
        audioVolume: 'volume',
        audioElement: 'element'
      }
    ),
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
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
