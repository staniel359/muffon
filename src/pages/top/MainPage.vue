<template>
  <BaseTopPageContainer
    :key="refreshKey"
    :is-get-data="false"
  >
    <BaseSegmentsContainer
      class="main-page-segment-container"
    >
      <ContentSection />
    </BaseSegmentsContainer>
  </BaseTopPageContainer>
</template>

<script>
import BaseTopPageContainer
  from '@/components/containers/pages/top/BaseTopPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import ContentSection from './MainPage/ContentSection.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseTopPageContainer,
    BaseSegmentsContainer,
    ContentSection
  },
  mixins: [
    pageMixin
  ]
}
</script>

<style lang="sass" scoped></style>
