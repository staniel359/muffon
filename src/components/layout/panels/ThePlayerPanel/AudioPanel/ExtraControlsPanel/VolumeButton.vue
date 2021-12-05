<template>
  <BaseButton
    class="tiny basic compact"
    :icon="iconFormatted"
    @init="handleButtonInit"
    @click="handleClick"
  />

  <VolumePopup />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '@/buttons/BaseButton.vue'
import VolumePopup from './VolumeButton/VolumePopup.vue'
import { setPopup } from '#/actions/plugins/semantic'
import { mainPopupOptions } from '#/data/plugins/semantic'

export default {
  name: 'VolumeButton',
  components: {
    BaseButton,
    VolumePopup
  },
  data () {
    return {
      button: null
    }
  },
  computed: {
    ...mapState('audio', {
      isAudioMuted: 'isMuted',
      audioVolume: 'volume',
      audioElement: 'element'
    }),
    iconFormatted () {
      return `volume ${this.volumeIcon}`
    },
    volumeIcon () {
      if (this.isAudioMuted) {
        return 'mute'
      } else if (this.isVolumeOff) {
        return 'off'
      } else if (this.isVolumeLow) {
        return 'down'
      } else {
        return 'up'
      }
    },
    isVolumeOff () {
      return this.audioVolume === 0
    },
    isVolumeLow () {
      return this.audioVolume <= 0.5
    }
  },
  mounted () {
    setPopup(
      this.button,
      mainPopupOptions()
    )
  },
  methods: {
    ...mapActions('audio', {
      setIsAudioMuted: 'setIsMuted'
    }),
    handleButtonInit (el) {
      this.button = el
    },
    handleClick () {
      const value = !this.isAudioMuted

      this.audioElement.muted = value
      this.audioElement.volume =
        this.audioVolume

      this.setIsAudioMuted(value)
    }
  }
}
</script>

<style lang="sass" scoped></style>
