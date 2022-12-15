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
  volumePopupOptions
} from '@/helpers/formatters/semantic'
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'VolumeButton',
  components: {
    BaseButton,
    BaseVolumePopup
  },
  mixins: [
    popupMixin
  ],
  computed: {
    ...mapState(
      'audio',
      {
        isAudioMuted: 'isMuted',
        audioVolume: 'volume',
        audioElement: 'element'
      }
    ),
    element () {
      return this.$refs.button.$el
    },
    popupOptions () {
      return volumePopupOptions()
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
