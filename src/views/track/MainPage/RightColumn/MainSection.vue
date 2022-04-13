<template>
  <BaseTrackHorizontalCardContainer
    class="track-card"
  >
    <InfoSection
      :track-data="trackData"
    />

    <BaseTrackPlayerPanel
      :track-data="trackData"
    />
  </BaseTrackHorizontalCardContainer>
</template>

<script>
import BaseTrackHorizontalCardContainer
  from '*/components/containers/track/BaseTrackHorizontalCardContainer.vue'
import InfoSection from './MainSection/InfoSection.vue'
import BaseTrackPlayerPanel
  from '*/components/models/track/BaseTrackPlayerPanel.vue'

export default {
  name: 'MainSection',
  components: {
    BaseTrackHorizontalCardContainer,
    InfoSection,
    BaseTrackPlayerPanel
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped>
.track-card
  @extend .overflow-hidden

::v-deep(.content)
  @extend .no-padding, .flex-column
</style>
