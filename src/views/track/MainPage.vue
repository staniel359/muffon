<template>
  <BasePageContainer>
    <template #default="pageSlotProps">
      <div class="ui segment main-segment-container main-page-segment-container">
        <MainSection :trackData="pageSlotProps.trackData" />

        <div class="track-bottom">
          <ExtraSection :trackData="pageSlotProps.trackData" />

          <LyricsSection
            :artistName="pageSlotProps.artistName"
            :trackTitle="pageSlotProps.trackTitle"
          />

          <SimilarSection
            :artistName="pageSlotProps.artistName"
            :trackTitle="pageSlotProps.trackTitle"
          />
        </div>
      </div>
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/track/BasePageContainer.vue'
import MainSection from './MainPage/MainSection.vue'
import ExtraSection from './MainPage/ExtraSection.vue'
import LyricsSection from './MainPage/LyricsSection.vue'
import SimilarSection from './MainPage/SimilarSection.vue'

export default {
  name: 'MainPage',
  components: {
    BasePageContainer,
    MainSection,
    ExtraSection,
    LyricsSection,
    SimilarSection
  }
}
</script>

<style lang="sass" scoped>
.main-segment-container
  @extend .d-flex, .flex-column

.track-bottom
  @extend .flex-full, .d-flex, .flex-column
  margin-left: calc(150px + 1em)
</style>
