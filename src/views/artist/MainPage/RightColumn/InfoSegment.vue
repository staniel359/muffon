<template>
  <BaseSegmentContainer class="main-segment-container">
    <InfoSection
      :artistData="artistData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import InfoSection from './InfoSegment/InfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    InfoSection
  },
  props: {
    artistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
