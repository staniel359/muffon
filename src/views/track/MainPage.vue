<template>
  <BasePageContainer>
    <template #default="pageSlotProps">
      <div class="ui segment main-segment-container main-page-segment-container">
        <MainSection :trackData="pageSlotProps.trackData" />

        <ExtraSection
          :trackData="pageSlotProps.trackData"
          :artistName="pageSlotProps.artistName"
          :trackTitle="pageSlotProps.trackTitle"
        />
      </div>
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/track/BasePageContainer.vue'
import MainSection from './MainPage/MainSection.vue'
import ExtraSection from './MainPage/ExtraSection.vue'

export default {
  name: 'MainPage',
  components: {
    BasePageContainer,
    MainSection,
    ExtraSection
  }
}
</script>

<style lang="sass" scoped>
.main-segment-container
  @extend .d-flex, .flex-column
</style>
