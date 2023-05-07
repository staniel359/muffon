<template>
  <div
    :key="refreshKey"
    class="home-page-container main-page-segment-container"
  >
    <ContentSection />
  </div>
</template>

<script>
import ContentSection from './MainPage/ContentSection.vue'
import {
  home as formatHomePageNavigation
} from '@/helpers/formatters/navigation'
import formatHomePageTab from '@/helpers/formatters/tabs/home'
import navigationMixin from '@/mixins/navigationMixin'
import pageMixin from '@/mixins/pageMixin'

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
      return formatHomePageNavigation()
    },
    tabData () {
      return formatHomePageTab()
    }
  }
}
</script>

<style lang="sass" scoped>
.home-page-container
  @extend .d-flex, .flex-column, .align-items-center
  padding-top: 5vh
  height: 70vh
</style>
