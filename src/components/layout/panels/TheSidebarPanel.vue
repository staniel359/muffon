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
      <ProfileItem
        :profile-id="profileId"
      />

      <div class="sidebar-top">
        <FeedItem
          v-if="isWithFeedItem"
        />

        <ConversationsItem
          v-if="isWithConversationsItem"
        />

        <LibraryItem
          v-if="isWithLibraryItem"
          :profile-id="profileId"
        />

        <RecommendationsItem
          v-if="isWithRecommendationsItem"
        />

        <SavedTracksItem
          v-if="isWithSavedTracksItem"
        />

        <PlaylistsItem
          v-if="isWithPlaylistsItem"
          :profile-id="profileId"
        />

        <FavoritesItem
          v-if="isWithFavoritesItem"
          :profile-id="profileId"
        />

        <BookmarksItem
          v-if="isWithBookmarksItem"
        />

        <TopItem
          v-if="isWithTopItem"
        />

        <ReleasesItem
          v-if="isWithReleasesItem"
        />

        <RadioItem
          v-if="isWithRadioItem"
        />

        <MultitagItem
          v-if="isWithMultitagItem"
        />

        <CommunitiesItem
          v-if="isWithCommunitiesItem"
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
  mapState,
  mapGetters
} from 'vuex'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import FeedItem from './TheSidebarPanel/FeedItem.vue'
import ConversationsItem from './TheSidebarPanel/ConversationsItem.vue'
import LibraryItem from './TheSidebarPanel/LibraryItem.vue'
import RecommendationsItem from './TheSidebarPanel/RecommendationsItem.vue'
import SavedTracksItem from './TheSidebarPanel/SavedTracksItem.vue'
import PlaylistsItem from './TheSidebarPanel/PlaylistsItem.vue'
import FavoritesItem from './TheSidebarPanel/FavoritesItem.vue'
import BookmarksItem from './TheSidebarPanel/BookmarksItem.vue'
import TopItem from './TheSidebarPanel/TopItem.vue'
import ReleasesItem from './TheSidebarPanel/ReleasesItem.vue'
import RadioItem from './TheSidebarPanel/RadioItem.vue'
import MultitagItem from './TheSidebarPanel/MultitagItem.vue'
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
    SavedTracksItem,
    PlaylistsItem,
    FavoritesItem,
    BookmarksItem,
    TopItem,
    ReleasesItem,
    RadioItem,
    MultitagItem,
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
      'sidebar',
      [
        'isWithFeedItem',
        'isWithConversationsItem',
        'isWithLibraryItem',
        'isWithRecommendationsItem',
        'isWithSavedTracksItem',
        'isWithPlaylistsItem',
        'isWithFavoritesItem',
        'isWithBookmarksItem',
        'isWithTopItem',
        'isWithReleasesItem',
        'isWithRadioItem',
        'isWithMultitagItem',
        'isWithCommunitiesItem'
      ]
    ),
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    )
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
