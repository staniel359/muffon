<template>
  <BaseButton
    ref="button"
    class="circular compact simple"
    icon="sliders"
    :class="isActive ? 'primary' : 'basic'"
    :is-invertable="!isActive"
    @click="handleButtonClick"
  />

  <div class="main-popup-container">
    <BaseAudioEqualizerPopup
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
import BaseAudioEqualizerPopup
  from '@/components/popups/BaseAudioEqualizerPopup.vue'
import audioEqualizerPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/audioEqualizer'
import popupMixin from '@/mixins/popupMixin'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'EqualizerButton',
  components: {
    BaseButton,
    BaseAudioEqualizerPopup
  },
  mixins: [
    popupMixin
  ],
  computed: {
    ...mapState(
      audioStore,
      {
        isAudioEqualizerEnabled:
          'isEqualizerEnabled'
      }
    ),
    element () {
      return this.$refs.button.$el
    },
    popupOptions () {
      return audioEqualizerPopupOptions(
        {
          html: this.popup
        }
      )
    },
    isActive () {
      return this.isAudioEqualizerEnabled
    }
  },
  methods: {
    handleButtonClick () {
      this.toggleIsAudioEqualizerEnabled()
    },
    toggleIsAudioEqualizerEnabled () {
      updateGlobalStore(
        {
          'audio.isEqualizerEnabled':
            !this.isAudioEqualizerEnabled
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
