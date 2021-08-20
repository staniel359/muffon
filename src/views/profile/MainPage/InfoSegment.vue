<template>
  <BaseSegmentContainer
    class="main-segment-container"
  >
    <MainInfoSection
      :profileData="profileData"
    />

    <ExtraInfoSection
      :profileData="profileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import MainInfoSection from './InfoSegment/MainInfoSection.vue'
import ExtraInfoSection from './InfoSegment/ExtraInfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    MainInfoSection,
    ExtraInfoSection
  },
  props: {
    profileData: Object
  }
}
</script>

<style lang="sass" scoped></style>
