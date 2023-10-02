<template>
  <BaseButton
    ref="button"
    class="circular compact simple"
    :class="isActive ? 'primary' : 'basic'"
    :icon="icon"
    :is-invertable="!isActive"
    @click="handleClick"
  />

  <div class="main-popup-container">
    <BaseVolumePopup
      ref="popup"
    />
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseVolumePopup from '@/components/popups/BaseVolumePopup.vue'
import volumePopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/volume'
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
      audioStore,
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
      return volumePopupOptions(
        {
          html: this.popup
        }
      )
    },
    icon () {
      if (this.isAudioMuted) {
        return 'volumeMute'
      } else if (this.isVolumeOff) {
        return 'volumeOff'
      } else if (this.isVolumeLow) {
        return 'volumeDown'
      } else {
        return 'volumeUp'
      }
    },
    isVolumeOff () {
      return this.audioVolume === 0
    },
    isVolumeLow () {
      return this.audioVolume <= 0.5
    },
    isActive () {
      return this.isAudioMuted
    }
  },
  methods: {
    ...mapActions(
      audioStore,
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
