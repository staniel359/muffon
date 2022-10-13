<template>
  <BaseButton
    ref="button"
    class="tiny basic circular compact"
    :icon="icon"
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
      this.$refs.button.$el,
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
