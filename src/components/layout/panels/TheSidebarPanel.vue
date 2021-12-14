<template>
  <div
    class="ui vertical menu left overlay visible sidebar the-sidebar-panel"
    :class="{ inverted: isDarkMode }"
  >
    <div class="sidebar-panel-content">
      <div class="sidebar-top">
        <ProfileItem />
        <FeedItem />
        <ConversationsItem />
        <LibraryItem />
        <RecommendationsItem />
        <PlaylistsItem />
        <FavoritesItem />
        <BookmarksItem />
        <TopItem />
        <RadioItem />
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
import FeedItem from './TheSidebarPanel/FeedItem.vue'
import ConversationsItem from './TheSidebarPanel/ConversationsItem.vue'
import LibraryItem from './TheSidebarPanel/LibraryItem.vue'
import RecommendationsItem from './TheSidebarPanel/RecommendationsItem.vue'
import PlaylistsItem from './TheSidebarPanel/PlaylistsItem.vue'
import FavoritesItem from './TheSidebarPanel/FavoritesItem.vue'
import BookmarksItem from './TheSidebarPanel/BookmarksItem.vue'
import TopItem from './TheSidebarPanel/TopItem.vue'
import RadioItem from './TheSidebarPanel/RadioItem.vue'
import SettingsItem from './TheSidebarPanel/SettingsItem.vue'
import LogoutItem from './TheSidebarPanel/LogoutItem.vue'

export default {
  name: 'TheSidebarPanel',
  components: {
    ProfileItem,
    FeedItem,
    ConversationsItem,
    LibraryItem,
    RecommendationsItem,
    PlaylistsItem,
    FavoritesItem,
    BookmarksItem,
    TopItem,
    RadioItem,
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
  transition: width 0.35s !important
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
