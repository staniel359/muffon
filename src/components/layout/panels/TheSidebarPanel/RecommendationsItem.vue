<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="recommendationsLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="volume up grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="textFormatted"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
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
    recommendationsLinkFormatted () {
      return formatRecommendationsLink()
    },
    textFormatted () {
      return this.$t(
        'layout.navigation.recommendations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
