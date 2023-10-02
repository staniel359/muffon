<template>
  <div class="middle-aligned-column width-100">
    <div class="main-transition-item">
      <BaseLogoImage />
    </div>

    <div class="main-transition-item">
      <WelcomeMessageSection />
    </div>
  </div>
</template>

<script>
import BaseLogoImage from '@/components/images/BaseLogoImage.vue'
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
    BaseLogoImage,
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

<style lang="sass" scoped></style>
