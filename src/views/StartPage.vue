<template>
  <div
    :class="[
      'start-page-container',
      'main-page-segment-container'
    ]"
  >
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    <BaseSegmentContainer
      :class="[
        'main-segment-container',
        'feed-segment'
      ]"
    >
      {{ feedTempTextFormatted }}
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  startPage as formatStartPageNavigation
} from '#/formatters/navigation'
import { startPage as formatStartPageTab } from '#/formatters/tabs'

export default {
  name: 'StartPage',
  components: {
    BaseHeader,
    BaseSegmentContainer
  },
  mixins: [
    navigationMixin
  ],
  computed: {
    navigationSections () {
      return formatStartPageNavigation()
    },
    tabData () {
      return formatStartPageTab()
    },
    feedTempTextFormatted () {
      return this.$t(
        'temp.feed'
      )
    }
  },
  mounted () {
    this.setNavigation()
  }
}
</script>

<style lang="sass" scoped>
.start-page-container
  @extend .d-flex, .flex-column, .align-items-center
  padding-top: 5vh
  height: 70vh

.feed-segment
  @extend .flex-full, .overflow-y-auto
  width: 450px
</style>
