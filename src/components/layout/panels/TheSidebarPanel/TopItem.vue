<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="topLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="arrow alternate circle up grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="topText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import { main as formatTopMainLink } from '#/formatters/links/top'

export default {
  name: 'TopItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    topLink () {
      return formatTopMainLink()
    },
    topText () {
      return this.$t(
        'layout.navigation.tops'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
