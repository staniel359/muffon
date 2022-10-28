<template>
  <BaseSegmentContainer
    class="settings-segment"
  >
    <BaseLanguageSelect />

    <DarkModeBlock />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseLanguageSelect from '@/components/selects/BaseLanguageSelect.vue'
import DarkModeBlock from './SettingsSegment/DarkModeBlock.vue'

export default {
  name: 'SettingsSegment',
  components: {
    BaseSegmentContainer,
    BaseLanguageSelect,
    DarkModeBlock
  }
}
</script>

<style lang="sass" scoped>
.settings-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
