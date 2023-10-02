<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="audioSourcesText"
      />

      <div>
        <SourcesList />

        <AddButton />
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import SourcesList from './AudioSourcesOption/SourcesList.vue'
import AddButton from './AudioSourcesOption/AddButton.vue'

export default {
  name: 'AudioSourcesOption',
  components: {
    BaseHeader,
    SourcesList,
    AddButton
  },
  computed: {
    audioSourcesText () {
      return this.$t(
        'settings.options.app.player.audioSources'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
