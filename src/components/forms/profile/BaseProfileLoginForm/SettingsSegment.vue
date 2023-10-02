<template>
  <BaseSegmentContainer
    class="middle-aligned-space-between"
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

<style lang="sass" scoped></style>
