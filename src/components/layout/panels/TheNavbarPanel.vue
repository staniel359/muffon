<template>
  <div
    :class="[
      'ui top fixed borderless menu',
      'the-navbar-panel',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <div class="ui container main-container">
      <NavbarSearchButton />

      <NavbarHistoryButton
        direction="back"
      />

      <NavbarNavigation />

      <NavbarHistoryButton
        direction="forward"
      />

      <NavbarRefreshButton />

      <NavbarQueueButton />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import NavbarHistoryButton from './TheNavbarPanel/NavbarHistoryButton.vue'
import NavbarSearchButton from './TheNavbarPanel/NavbarSearchButton.vue'
import NavbarNavigation from './TheNavbarPanel/NavbarNavigation.vue'
import NavbarRefreshButton from './TheNavbarPanel/NavbarRefreshButton.vue'
import NavbarQueueButton from './TheNavbarPanel/NavbarQueueButton.vue'

export default {
  name: 'TheNavbarPanel',
  components: {
    NavbarHistoryButton,
    NavbarSearchButton,
    NavbarNavigation,
    NavbarRefreshButton,
    NavbarQueueButton
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  }
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
