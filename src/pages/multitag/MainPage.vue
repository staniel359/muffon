<template>
  <div
    :key="refreshKey"
    class="main-page-container"
    :class="{
      'with-player': playerPlaying
    }"
  >
    <ContentSection />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'

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
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
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
