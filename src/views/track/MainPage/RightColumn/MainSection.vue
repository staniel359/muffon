<template>
  <BaseHorizontalCardContainer
    class="track-card"
  >
    <template #default>
      <InfoSection
        :track-data="trackData"
      />

      <BaseTrackPlayerPanel
        :track-data="trackData"
      />
    </template>
  </BaseHorizontalCardContainer>
</template>

<script>
import BaseHorizontalCardContainer
  from '*/components/containers/cards/BaseHorizontalCardContainer.vue'
import InfoSection from './MainSection/InfoSection.vue'
import BaseTrackPlayerPanel
  from '*/components/models/track/BaseTrackPlayerPanel.vue'

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
.track-card
  @extend .overflow-hidden

::v-deep(.content)
  @extend .no-padding, .flex-column
</style>
