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
import { mapState } from 'vuex'
import BaseButton from '@/BaseButton.vue'
import VolumePopup from './VolumeButton/VolumePopup.vue'
import { setPopup } from '#/actions/plugins/semantic'
import { mainPopupOptions } from '#/data/plugins/semantic'
import { toggleIsMuted as toggleIsAudioMuted } from '#/actions/audio'

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
      audioVolume: 'volume'
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
    handleButtonInit (el) {
      this.button = el
    },
    handleClick () {
      toggleIsAudioMuted()
    }
  }
}
</script>

<style lang="sass" scoped></style>
