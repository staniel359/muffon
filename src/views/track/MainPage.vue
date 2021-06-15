<template>
  <BaseTrackPageContainer>
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <MainSection :trackData="slotProps.trackData" />
        <ExtraSection :trackData="slotProps.trackData"/>
      </BaseSegmentContainer>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import MainSection from './MainPage/MainSection.vue'
import ExtraSection from './MainPage/ExtraSection.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    MainSection,
    ExtraSection
  }
}
</script>

<style lang="sass" scoped></style>
