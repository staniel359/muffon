<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <div>
        <SourcesList />

        <AddButton />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import SourcesList from './AudioSourcesOption/SourcesList.vue'
import AddButton from './AudioSourcesOption/AddButton.vue'

export default {
  name: 'AudioSourcesOption',
  components: {
    BaseSettingsOptionHeader,
    SourcesList,
    AddButton
  },
  computed: {
    optionText () {
      return this.$t(
        'settings.options.app.player.audioSources'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
