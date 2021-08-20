<template>
  <div
    class="ui vertical menu left overlay visible sidebar the-sidebar-panel"
    :class="{ inverted: isDarkMode }"
  >
    <div class="sidebar-panel-content">
      <div class="sidebar-top">
        <ProfileItem />
        <LibraryItem />
      </div>

      <div>
        <SettingsItem />
        <LogoutItem />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import LibraryItem from './TheSidebarPanel/LibraryItem.vue'
import SettingsItem from './TheSidebarPanel/SettingsItem.vue'
import LogoutItem from './TheSidebarPanel/LogoutItem.vue'

export default {
  name: 'TheSidebarPanel',
  components: {
    ProfileItem,
    LibraryItem,
    SettingsItem,
    LogoutItem
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped>
.the-sidebar-panel
  @extend .no-border
  z-index: 300 !important
  width: 40px !important
  overflow-x: hidden
  transition: 0.4s !important
  &:hover
    width: 240px !important
    & > .sidebar-top
      @extend .overflow-y-auto
  &.inverted
    border-right: $borderInverted !important
  & > .item
    &:first-child
      @extend .no-border-radius

.sidebar-panel-content
  @extend .h-100, .d-flex, .flex-column

.sidebar-top
  @extend .flex-full, .overflow-hidden
</style>
