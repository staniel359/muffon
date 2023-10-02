<template>
  <BaseSegmentsContainer
    :key="refreshKey"
    class="main-page-container"
  >
    <ContentSection />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import ContentSection from './MainPage/ContentSection.vue'
import navigationMixin from '@/mixins/navigationMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  radio as formatRadioPageNavigation
} from '@/helpers/formatters/navigation'
import formatRadioPageTab from '@/helpers/formatters/tabs/radio'

export default {
  name: 'MainPage',
  components: {
    BaseSegmentsContainer,
    ContentSection
  },
  mixins: [
    navigationMixin,
    pageMixin
  ],
  data () {
    return {
      isPageLoaded: true
    }
  },
  computed: {
    navigationSections () {
      return formatRadioPageNavigation()
    },
    tabData () {
      return formatRadioPageTab()
    }
  }
}
</script>

<style lang="sass" scoped></style>
