<template>
  <div class="start-page-container">
    <BaseHeader
      class="start-header"
      tag="h1"
      text="muffon"
    />

    <KeysCombinationsSection />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import KeysCombinationsSection from './StartPage/KeysCombinationsSection.vue'
import { startPage as formatStartPageNavigation } from '#/formatters/navigation'
import { updateTab } from '#/actions'
import { startPage as formatStartPageTab } from '#/formatters/tabs'

export default {
  name: 'StartPage',
  components: {
    BaseHeader,
    KeysCombinationsSection
  },
  mounted () {
    this.setNavigationSections(
      formatStartPageNavigation()
    )

    updateTab(
      formatStartPageTab()
    )
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ])
  }
}
</script>

<style lang="sass" scoped>
.start-page-container
  @extend .d-flex, .flex-column, .align-items-center
  margin-top: 25vh

.start-header
  @extend .text-color-white
  font-size: 3.5em !important
  font-weight: 400
  margin-bottom: 25px !important
</style>
