<template>
  <BasePageContainer
    :key="refreshKey"
    class="home-page-container"
    :response-data="responseData"
  >
    <TopSection />

    <ContentSection />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import TopSection from './MainPage/TopSection.vue'
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
    BasePageContainer,
    TopSection,
    ContentSection
  },
  mixins: [
    navigationMixin,
    pageMixin
  ],
  data () {
    return {
      isPageLoaded: true,
      responseData: {}
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
  margin-top: 7vh
</style>
