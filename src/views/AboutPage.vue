<template>
  <BaseSegmentContainer
    :class="[
      'about-page-segment',
      'main-segment-container'
    ]"
    :is-change-transparency="false"
  >
    <div class="left-column">
      <ImageSection />
    </div>

    <div class="right-column">
      <NameSection />

      <VersionSection />

      <CopyrightLicenseSection />

      <BaseDivider />

      <HomepageSection />

      <DonateSection />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ImageSection from './AboutPage/ImageSection.vue'
import NameSection from './AboutPage/NameSection.vue'
import VersionSection from './AboutPage/VersionSection.vue'
import CopyrightLicenseSection from './AboutPage/CopyrightLicenseSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import HomepageSection from './AboutPage/HomepageSection.vue'
import DonateSection from './AboutPage/DonateSection.vue'

export default {
  name: 'AboutPage',
  components: {
    BaseSegmentContainer,
    ImageSection,
    NameSection,
    VersionSection,
    CopyrightLicenseSection,
    BaseDivider,
    HomepageSection,
    DonateSection
  }
}
</script>

<style lang="sass" scoped>
.about-page-segment
  @extend .d-flex, .h-100, .no-margin, .no-border-radius
  padding: 2em 3em

.left-column
  margin-right: 1.5em
  width: 80px

.right-column
  @extend .flex-full
</style>
