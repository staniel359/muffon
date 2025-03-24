<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="window.isMaximizeOnStart"
        :is-checked="isMaximizeOnStart"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import windowStore from '@/stores/window'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'MaximizeOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      windowStore,
      [
        'isMaximizeOnStart'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.window.maximize'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
