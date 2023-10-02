<template>
  <BaseSegmentContainer
    class="info-segment"
  >
    <InfoSection
      :track-data="trackData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import InfoSection from './InfoSegment/InfoSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    InfoSection
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped>
.info-segment
  padding: 1.5rem 1.75rem 2rem 1.75rem !important
</style>
