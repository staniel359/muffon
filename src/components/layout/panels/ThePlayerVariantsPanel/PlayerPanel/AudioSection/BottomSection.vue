<template>
  <div class="width-100 middle-aligned bottom-section">
    <CurrentTimeSection />

    <div class="relative flex-full">
      <ScrobblePointSection />

      <SeekerPanelSection />
    </div>

    <DurationSection />
  </div>
</template>

<script>
import CurrentTimeSection from './BottomSection/CurrentTimeSection.vue'
import ScrobblePointSection from './BottomSection/ScrobblePointSection.vue'
import SeekerPanelSection from './BottomSection/SeekerPanelSection.vue'
import DurationSection from './BottomSection/DurationSection.vue'

export default {
  name: 'BottomSection',
  components: {
    CurrentTimeSection,
    ScrobblePointSection,
    SeekerPanelSection,
    DurationSection
  }
}
</script>

<style lang="sass" scoped>
.bottom-section
  margin-top: 0.1rem
</style>
