<template>
  <BaseSegmentContainer
    class="raised main-segment-container actions-segment"
  >
    <WhatsNewButtonSection />

    <DonateButtonSection />

    <DiscordButtonSection />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import WhatsNewButtonSection from './ActionsSegment/WhatsNewButtonSection.vue'
import DonateButtonSection from './ActionsSegment/DonateButtonSection.vue'
import DiscordButtonSection from './ActionsSegment/DiscordButtonSection.vue'

export default {
  name: 'ActionsSegment',
  components: {
    BaseSegmentContainer,
    WhatsNewButtonSection,
    DonateButtonSection,
    DiscordButtonSection
  }
}
</script>

<style lang="sass" scoped>
.actions-segment
  @extend .d-flex, .justify-content-center

.action-button-container
  &:not(:first-child)
    margin-left: 0.75em
  ::v-deep(.icon)
    @extend .width-fit-content
    margin-right: 0.65em !important
</style>
