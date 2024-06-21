<template>
  <BaseButton
    ref="button"
    class="circular compact simple"
    :class="buttonClass"
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
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseVolumePopup from '@/components/popups/BaseVolumePopup.vue'
import volumePopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/volume'
import popupMixin from '@/mixins/popupMixin'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

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
        audioVolume: 'volume'
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
      return !this.audioVolume
    },
    isVolumeLow () {
      return (
        this.audioVolume <= 0.5
      )
    },
    isActive () {
      return this.isAudioMuted
    },
    buttonClass () {
      if (this.isActive) {
        return 'primary'
      } else {
        return 'basic'
      }
    }
  },
  methods: {
    handleClick () {
      this.toggleAudioMuted()
    },
    toggleAudioMuted () {
      updateGlobalStore(
        {
          'audio.isMuted':
            !this.isAudioMuted
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
