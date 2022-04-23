<template>
  <div
    :class="[
      'ui vertical menu',
      'left overlay visible sidebar',
      'the-sidebar-panel',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <div class="sidebar-panel-content">
      <ProfileItem />

      <div class="sidebar-top">
        <FeedItem />

        <ConversationsItem />

        <LibraryItem
          :profile-id="profileId"
        />

        <RecommendationsItem />

        <PlaylistsItem
          :profile-id="profileId"
        />

        <FavoritesItem
          :profile-id="profileId"
        />

        <BookmarksItem />

        <TopItem />

        <ReleasesItem />

        <RadioItem />

        <CommunitiesItem
          :profile-id="profileId"
        />
      </div>

      <div class="sidebar-bottom">
        <SettingsItem />

        <LogoutItem />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import FeedItem from './TheSidebarPanel/FeedItem.vue'
import ConversationsItem from './TheSidebarPanel/ConversationsItem.vue'
import LibraryItem from './TheSidebarPanel/LibraryItem.vue'
import RecommendationsItem from './TheSidebarPanel/RecommendationsItem.vue'
import PlaylistsItem from './TheSidebarPanel/PlaylistsItem.vue'
import FavoritesItem from './TheSidebarPanel/FavoritesItem.vue'
import BookmarksItem from './TheSidebarPanel/BookmarksItem.vue'
import TopItem from './TheSidebarPanel/TopItem.vue'
import ReleasesItem from './TheSidebarPanel/ReleasesItem.vue'
import RadioItem from './TheSidebarPanel/RadioItem.vue'
import CommunitiesItem from './TheSidebarPanel/CommunitiesItem.vue'
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
    ReleasesItem,
    RadioItem,
    CommunitiesItem,
    SettingsItem,
    LogoutItem
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo.id.toString()
    }
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
    .sidebar-top
      @extend .overflow-y-auto
  &.inverted
    border-right: $borderInverted !important
    .sidebar-bottom
      border-top: $borderInverted

.sidebar-panel-content
  @extend .h-100, .d-flex, .flex-column

.sidebar-top
  @extend .flex-full, .overflow-y-auto
  overflow-x: hidden
  &::-webkit-scrollbar
    @extend .d-none

.sidebar-bottom
  border-top: $border
</style>
