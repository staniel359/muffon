<template>
  <BaseHorizontalCardContainer>
    <InfoSection
      :track-data="trackData"
    />

    <BaseTrackPlayerPanel
      :track-data="trackData"
    />
  </BaseHorizontalCardContainer>
</template>

<script>
import BaseHorizontalCardContainer
  from '@/components/containers/cards/BaseHorizontalCardContainer.vue'
import InfoSection from './MainSection/InfoSection.vue'
import BaseTrackPlayerPanel
  from '@/components/models/track/BaseTrackPlayerPanel.vue'

export default {
  name: 'MainSection',
  components: {
    BaseHorizontalCardContainer,
    InfoSection,
    BaseTrackPlayerPanel
  },
  props: {
    trackData: Object
  }
}
</script>

<style lang="sass" scoped>
:deep(.content)
  @extend .no-padding, .flex-column
</style>
