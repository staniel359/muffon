<template>
  <BaseSegmentContainer
    class="settings-segment"
  >
    <BaseLanguageDropdown />

    <DarkModeBlock />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseLanguageDropdown
  from '*/components/dropdowns/BaseLanguageDropdown.vue'
import DarkModeBlock from './SettingsSegment/DarkModeBlock.vue'

export default {
  name: 'SettingsSegment',
  components: {
    BaseSegmentContainer,
    BaseLanguageDropdown,
    DarkModeBlock
  }
}
</script>

<style lang="sass" scoped>
.settings-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
