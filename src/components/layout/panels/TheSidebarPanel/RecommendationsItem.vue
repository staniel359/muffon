<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="recommendationsLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="volume up grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="recommendationsText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import {
  recommendations as formatRecommendationsLink
} from '#/formatters/links'

export default {
  name: 'RecommendationsItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    recommendationsLink () {
      return formatRecommendationsLink()
    },
    recommendationsText () {
      return this.$t(
        'layout.navigation.recommendations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
