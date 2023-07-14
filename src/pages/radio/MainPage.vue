<template>
  <div
    :key="refreshKey"
    :class="[
      'ui raised segments main-segments',
      'main-segment-container',
      'main-page-container'
    ]"
  >
    <ContentSection />
  </div>
</template>

<script>
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
