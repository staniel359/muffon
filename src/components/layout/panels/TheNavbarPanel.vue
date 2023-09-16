<template>
  <BaseMenuContainer
    class="top fixed borderless blurred the-navbar-panel"
    :class="transparentClass"
  >
    <div class="ui container main-container">
      <NavbarSearchButton />

      <NavbarHistoryButton
        direction="back"
        icon="arrowLeft"
      />

      <NavbarNavigation />

      <NavbarHistoryButton
        direction="forward"
        icon="arrowRight"
      />

      <NavbarRefreshButton />

      <NavbarQueueButton />
    </div>
  </BaseMenuContainer>
</template>

<script>
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import NavbarSearchButton from './TheNavbarPanel/NavbarSearchButton.vue'
import NavbarHistoryButton from './TheNavbarPanel/NavbarHistoryButton.vue'
import NavbarNavigation from './TheNavbarPanel/NavbarNavigation.vue'
import NavbarRefreshButton from './TheNavbarPanel/NavbarRefreshButton.vue'
import NavbarQueueButton from './TheNavbarPanel/NavbarQueueButton.vue'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'TheNavbarPanel',
  components: {
    BaseMenuContainer,
    NavbarSearchButton,
    NavbarHistoryButton,
    NavbarNavigation,
    NavbarRefreshButton,
    NavbarQueueButton
  },
  mixins: [
    transparencyMixin
  ]
}
</script>

<style lang="sass" scoped>
.the-navbar-panel
  @extend .no-border
  height: $navbarHeight
  z-index: 200 !important
  &.inverted
    border-bottom: $borderInverted !important
</style>
