<template>
  <div
    :class="[
      'feed-page-container',
      'main-page-segment-container'
    ]"
  >
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    <FeedSegment />
  </div>
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import FeedSegment from './FeedPage/FeedSegment.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  feed as formatFeedPageNavigation
} from '*/helpers/formatters/navigation'
import { feed as formatFeedPageTab } from '*/helpers/formatters/tabs'

export default {
  name: 'FeedPage',
  components: {
    BaseHeader,
    FeedSegment
  },
  mixins: [
    navigationMixin
  ],
  computed: {
    navigationSections () {
      return formatFeedPageNavigation()
    },
    tabData () {
      return formatFeedPageTab()
    }
  },
  mounted () {
    this.setNavigation()
  }
}
</script>

<style lang="sass" scoped>
.feed-page-container
  @extend .d-flex, .flex-column, .align-items-center
  padding-top: 5vh
  height: 70vh
</style>
