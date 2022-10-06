<template>
  <BaseButton
    class="tiny basic circular compact"
    :icon="icon"
    @init="handleButtonInit"
    @click="handleClick"
  />

  <BaseVolumePopup />
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseVolumePopup from '@/components/popups/BaseVolumePopup.vue'
import {
  setPopup
} from '@/helpers/actions/plugins/semantic'
import {
  mainPopupOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'VolumeButton',
  components: {
    BaseButton,
    BaseVolumePopup
  },
  data () {
    return {
      button: null
    }
  },
  computed: {
    ...mapState(
      'audio',
      {
        isAudioMuted: 'isMuted',
        audioVolume: 'volume',
        audioElement: 'element'
      }
    ),
    popupOptions () {
      return mainPopupOptions()
    },
    icon () {
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
      this.popupOptions
    )
  },
  methods: {
    ...mapActions(
      'audio',
      {
        setIsAudioMuted: 'setIsMuted'
      }
    ),
    handleButtonInit (
      element
    ) {
      this.button = element
    },
    handleClick () {
      const value = !this.isAudioMuted

      this.audioElement.muted = value
      this.audioElement.volume =
        this.audioVolume

      this.setIsAudioMuted(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
