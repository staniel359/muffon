<template>
  <BaseSegmentsContainer
    class="nested"
  >
    <InfoSegment
      :track-data="trackData"
    />

    <PlayerSegment
      :track-data="trackData"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './MainSection/InfoSegment.vue'
import PlayerSegment from './MainSection/PlayerSegment.vue'

export default {
  name: 'MainSection',
  components: {
    BaseSegmentsContainer,
    InfoSegment,
    PlayerSegment
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
