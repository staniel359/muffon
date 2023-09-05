<template>
  <div class="top-section">
    <div class="main-transition-item">
      <BaseLogoSection />
    </div>

    <div class="main-transition-item">
      <WelcomeMessageSection />
    </div>
  </div>
</template>

<script>
import BaseLogoSection from '@/components/sections/BaseLogoSection.vue'
import WelcomeMessageSection from './TopSection/WelcomeMessageSection.vue'
import {
  set as setTransition
} from '@/helpers/actions/plugins/semantic/transition'
import {
  main as formatMainTransitionOptions
} from '@/helpers/formatters/plugins/semantic/options/transition'

export default {
  name: 'TopSection',
  components: {
    BaseLogoSection,
    WelcomeMessageSection
  },
  computed: {
    transitionOptions () {
      return formatMainTransitionOptions()
    }
  },
  mounted () {
    setTransition(
      '.main-transition-item',
      this.transitionOptions
    )
  }
}
</script>

<style lang="sass" scoped>
.top-section
  @extend .w-100, .d-flex, .flex-column, .align-items-center
</style>
