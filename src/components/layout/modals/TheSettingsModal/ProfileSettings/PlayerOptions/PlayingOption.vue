<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="profile.isShowPlaying"
        :is-checked="isShowProfilePlaying"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PlayingOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      profileStore,
      {
        isShowProfilePlaying: 'isShowPlaying'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.profile.player.playing'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
