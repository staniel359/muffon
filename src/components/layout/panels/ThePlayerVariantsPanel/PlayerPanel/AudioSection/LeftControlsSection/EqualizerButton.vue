<template>
  <BaseButton
    ref="button"
    class="tiny circular compact"
    icon="sliders"
    :class="isActive ? 'primary' : 'basic'"
    :is-invertable="!isActive"
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
import {
  audioEqualizer as audioEqualizerPopupOptions
} from '@/helpers/formatters/plugins/semantic/options/popup'
import popupMixin from '@/mixins/popupMixin'

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
  }
}
</script>

<style lang="sass" scoped></style>
