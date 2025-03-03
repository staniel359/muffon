<template>
  <BaseSegmentsContainer
    class="main-profile-page-left-column main-sticky-container"
  >
    <InfoSegment
      :album-data="albumData"
      :profile-id="profileId"
    />

    <BaseCreatedSegment
      class="main-profile-page-info"
      model="library"
      :model-data="albumData"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './LeftColumn/InfoSegment.vue'
import BaseCreatedSegment from '@/components/segments/BaseCreatedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseSegmentsContainer,
    InfoSegment,
    BaseCreatedSegment
  },
  props: {
    albumData: Object,
    profileId: Number
  }
}
</script>

<style lang="sass" scoped></style>
