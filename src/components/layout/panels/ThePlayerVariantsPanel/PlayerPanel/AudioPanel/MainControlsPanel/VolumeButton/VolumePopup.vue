<template>
  <BasePopupContainer
    class="volume-popup"
  >
    <div class="volume-header-container">
      <BaseHeader
        tag="h4"
        :text="volumeText"
      />
    </div>

    <BaseSeeker
      class="vertical reversed volume-seeker"
      :options="seekerOptions"
      @init="handleInit"
      @move="handleMove"
      @mouse-up="handleMouseUp"
    />
  </BasePopupContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BasePopupContainer from '@/components/containers/BasePopupContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  mainVolumeSeekerOptions
} from '@/helpers/data/plugins/semantic'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  setSeekerValue
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'VolumePopup',
  components: {
    BasePopupContainer,
    BaseHeader,
    BaseSeeker
  },
  data () {
    return {
      seeker: null
    }
  },
  computed: {
    ...mapState(
      'audio',
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
    handleInit (
      element
    ) {
      this.seeker = element
    },
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
    handleAudioVolumeChange (
      value
    ) {
      setSeekerValue(
        this.seeker,
        value
      )

      this.setAudioVolume(
        value
      )
    },
    async setAudioVolume (
      value
    ) {
      await this.$nextTick()

      this.audioElement.volume = value
    }
  }
}
</script>

<style lang="sass" scoped>
.volume-popup
  @extend .text-align-center
  width: 60px

.volume-header-container
  margin-bottom: 0.25em

.volume-seeker
  @extend .w-100, .d-flex, .justify-content-center
  height: 110px !important
  padding: 5px 0 !important
</style>
