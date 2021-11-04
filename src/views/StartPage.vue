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
import { mapState, mapActions } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import {
  startPage as formatStartPageNavigation
} from '#/formatters/navigation'
import { updateTab } from '#/actions'
import { startPage as formatStartPageTab } from '#/formatters/tabs'

export default {
  name: 'StartPage',
  components: {
    BaseHeader,
    BaseSegmentContainer
  },
  computed: {
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
    feedTempTextFormatted () {
      return this.$t(
        'temp.feed'
      )
    }
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    }
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    setNavigation () {
      this.setNavigationSections(
        formatStartPageNavigation()
      )

      updateTab(
        formatStartPageTab()
      )
    }
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
