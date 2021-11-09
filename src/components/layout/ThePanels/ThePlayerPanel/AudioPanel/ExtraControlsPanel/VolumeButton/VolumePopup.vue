<template>
  <BasePopupContainer class="volume-popup">
    <div class="volume-header-container">
      <BaseHeader
        tag="h4"
        :text="headerFormatted"
      />
    </div>

    <BaseSeeker
      class="vertical reversed volume-seeker"
      :options="seekerOptions"
      @init="handleInit"
      @move="handleMove"
      @mouseUp="handleMouseUp"
    />
  </BasePopupContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePopupContainer from '@/containers/BasePopupContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSeeker from '@/BaseSeeker.vue'
import { mainVolumeSeekerOptions } from '#/data/plugins/semantic'
import { updateStore } from '#/actions'
import { setSeekerValue } from '#/actions/plugins/semantic'

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
    ...mapState('audio', {
      audioVolume: 'volume',
      audioElement: 'element'
    }),
    headerFormatted () {
      return Math.floor(
        this.audioVolume * 100
      ).toString()
    },
    seekerOptions () {
      return mainVolumeSeekerOptions({
        start: this.audioVolume
      })
    }
  },
  watch: {
    audioVolume: 'handleAudioVolumeChange'
  },
  methods: {
    handleInit (el) {
      this.seeker = el
    },
    handleMove (value) {
      this.audioElement.volume = value
    },
    handleMouseUp () {
      updateStore({
        'audio.volume': this.audioVolume
      })
    },
    handleAudioVolumeChange (value) {
      setSeekerValue(
        this.seeker,
        value
      )
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
