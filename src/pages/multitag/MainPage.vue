<template>
  <div
    :key="refreshKey"
    class="main-page-container"
  >
    <ContentSection />
  </div>
</template>

<script>
import ContentSection from './MainPage/ContentSection.vue'
import navigationMixin from '@/mixins/navigationMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  multitag as formatMultitagPageNavigation
} from '@/helpers/formatters/navigation'
import formatMultitagPageTab from '@/helpers/formatters/tabs/multitag'

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
      return formatMultitagPageNavigation()
    },
    tabData () {
      return formatMultitagPageTab()
    }
  }
}
</script>

<style lang="sass" scoped></style>
