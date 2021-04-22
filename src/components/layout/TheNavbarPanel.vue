<template>
  <div
    class="ui top fixed borderless menu"
    id="the-navbar"
  >
    <div class="ui container main-container">
      <NavbarHistoryButton direction="back" />

      <NavbarNavigation />

      <NavbarSettingsButton />

      <NavbarHistoryButton direction="forward" />
    </div>
  </div>
</template>

<script>
import NavbarHistoryButton from './TheNavbarPanel/NavbarHistoryButton.vue'
import NavbarSettingsButton from './TheNavbarPanel/NavbarSettingsButton.vue'
import NavbarNavigation from './TheNavbarPanel/NavbarNavigation.vue'

export default {
  name: 'TheNavbarPanel',
  components: {
    NavbarHistoryButton,
    NavbarSettingsButton,
    NavbarNavigation
  }
}
</script>

<style lang="sass" scoped>
#the-navbar
  @extend .no-border
  height: $navbarHeight
  z-index: 1500
</style>
