<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="topLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="arrow alternate circle up grey icon"></i>
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
import { main as formatTopMainLink } from '#/formatters/links/top'

export default {
  name: 'RecommendationsItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    topLinkFormatted () {
      return formatTopMainLink()
    },
    textFormatted () {
      return this.$t(
        'layout.navigation.tops'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
