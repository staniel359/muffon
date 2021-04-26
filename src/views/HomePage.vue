<template>
  <BasePageContainer>
    <BaseSegmentContainer
      :class="[
        'main-segment-container',
        'main-page-segment-container'
      ]"
    >
      Home
    </BaseSegmentContainer>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import { homePage as formatHomePageNavigation } from '#/formatters/navigation'

export default {
  name: 'HomePage',
  components: {
    BasePageContainer,
    BaseSegmentContainer
  },
  computed: {
    navigationSections () {
      return formatHomePageNavigation()
    }
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    setNavigation () {
      setNavigationSections(
        this.navigationSections
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
