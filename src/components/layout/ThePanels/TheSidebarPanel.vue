<template>
  <BaseSegmentContainer
    class="vertical menu the-sidebar-panel"
  >
    <div class="sidebar-top">
      <ProfileItem />
    </div>

    <div class="sidebar-bottom">
      <LogoutItem />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import LogoutItem from './TheSidebarPanel/LogoutItem.vue'

export default {
  name: 'TheSidebarPanel',
  components: {
    BaseSegmentContainer,
    ProfileItem,
    LogoutItem
  }
}
</script>

<style lang="sass" scoped>
.the-sidebar-panel
  @extend .no-padding, .h-100, .fixed, .no-border, .relative, .d-flex, .flex-column
  z-index: 500 !important
  width: 40px !important
  transition: 0.4s
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
