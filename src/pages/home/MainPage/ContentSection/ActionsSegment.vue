<template>
  <BaseSegmentContainer
    class="raised main-segment-container center-aligned"
  >
    <div class="main-buttons-container">
      <WhatsNewButtonSection />

      <DonateButtonSection />

      <DiscordButtonSection />
    </div>
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

<style lang="sass" scoped></style>
