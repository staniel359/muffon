<template>
  <BaseSegmentContainer
    class="about-page-segment main-segment-container"
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

      <div>
        <HomepageSection />

        <DonateSection />

        <ContactSection />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ImageSection from './MainPage/ImageSection.vue'
import NameSection from './MainPage/NameSection.vue'
import VersionSection from './MainPage/VersionSection.vue'
import CopyrightLicenseSection from './MainPage/CopyrightLicenseSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import HomepageSection from './MainPage/HomepageSection.vue'
import DonateSection from './MainPage/DonateSection.vue'
import ContactSection from './MainPage/ContactSection.vue'

export default {
  name: 'MainPage',
  components: {
    BaseSegmentContainer,
    ImageSection,
    NameSection,
    VersionSection,
    CopyrightLicenseSection,
    BaseDivider,
    HomepageSection,
    DonateSection,
    ContactSection
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

.link-section
  @extend .d-inline-block
  margin-right: 1em
</style>
