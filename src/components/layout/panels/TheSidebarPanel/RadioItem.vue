<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="radioLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="broadcast tower grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="radioText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import { radio as formatRadioLink } from '#/formatters/links'

export default {
  name: 'RadioItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    radioLink () {
      return formatRadioLink()
    },
    radioText () {
      return this.$t(
        'layout.navigation.radio'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
