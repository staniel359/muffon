<template>
  <BaseSegmentContainer
    class="vertical menu the-sidebar-panel"
  >
    <div class="sidebar-top">
      <ProfileItem />
    </div>

    <div class="sidebar-bottom">
      <SettingsItem />
      <LogoutItem />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import SettingsItem from './TheSidebarPanel/SettingsItem.vue'
import LogoutItem from './TheSidebarPanel/LogoutItem.vue'

export default {
  name: 'TheSidebarPanel',
  components: {
    BaseSegmentContainer,
    ProfileItem,
    SettingsItem,
    LogoutItem
  }
}
</script>

<style lang="sass" scoped>
.the-sidebar-panel
  @extend .no-padding, .h-100, .fixed, .no-border, .relative, .d-flex, .flex-column
  z-index: 500 !important
  width: 40px !important
  transition: width 0.3s
  overflow-x: hidden
  &:hover
    width: 240px !important
    & > .sidebar-top
      @extend .overflow-y-auto
  &.inverted
    border-right: $borderInverted !important
  & > .item
    &:first-child
      @extend .no-border-radius

.sidebar-top
  @extend .flex-full, .overflow-hidden
</style>
