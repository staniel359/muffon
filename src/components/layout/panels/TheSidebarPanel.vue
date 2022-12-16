<template>
  <BaseMenuContainer
    class="vertical left overlay visible sidebar the-sidebar-panel"
  >
    <div class="sidebar-panel-content">
      <ProfileItem
        v-if="profileId"
        :profile-id="profileId"
      />
      <RootItem
        v-else
      />

      <div class="sidebar-top">
        <FeedItem
          v-if="isRenderFeedItem"
        />

        <ConversationsItem
          v-if="isRenderConversationsItem"
        />

        <LibraryItem
          v-if="isRenderLibraryItem"
          :profile-id="profileId"
        />

        <RecommendationsItem
          v-if="isRenderRecommendationsItem"
        />

        <SavedTracksItem
          v-if="isSidebarWithSavedTracksItem"
        />

        <PlaylistsItem
          v-if="isSidebarWithPlaylistsItem"
          :profile-id="profileId"
        />

        <FavoritesItem
          v-if="isRenderFavoritesItem"
          :profile-id="profileId"
        />

        <BookmarksItem
          v-if="isRenderBookmarksItem"
        />

        <TopItem
          v-if="isSidebarWithTopItem"
        />

        <ReleasesItem
          v-if="isSidebarWithReleasesItem"
        />

        <RadioItem
          v-if="isSidebarWithRadioItem"
        />

        <MultitagItem
          v-if="isSidebarWithMultitagItem"
        />

        <CommunitiesItem
          v-if="isSidebarWithCommunitiesItem"
          :profile-id="profileId"
        />
      </div>

      <div class="sidebar-bottom">
        <SettingsItem />

        <LogoutItem
          v-if="profileId"
        />
        <LoginItem
          v-else
        />
      </div>
    </div>
  </BaseMenuContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import sidebarStore from '@/stores/sidebar'
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import RootItem from './TheSidebarPanel/RootItem.vue'
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
import LoginItem from './TheSidebarPanel/LoginItem.vue'

export default {
  name: 'TheSidebarPanel',
  components: {
    BaseMenuContainer,
    ProfileItem,
    RootItem,
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
    LogoutItem,
    LoginItem
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      sidebarStore,
      {
        isSidebarWithFeedItem:
          'isWithFeedItem',
        isSidebarWithConversationsItem:
          'isWithConversationsItem',
        isSidebarWithLibraryItem:
          'isWithLibraryItem',
        isSidebarWithRecommendationsItem:
          'isWithRecommendationsItem',
        isSidebarWithSavedTracksItem:
          'isWithSavedTracksItem',
        isSidebarWithPlaylistsItem:
          'isWithPlaylistsItem',
        isSidebarWithFavoritesItem:
          'isWithFavoritesItem',
        isSidebarWithBookmarksItem:
          'isWithBookmarksItem',
        isSidebarWithTopItem:
          'isWithTopItem',
        isSidebarWithReleasesItem:
          'isWithReleasesItem',
        isSidebarWithRadioItem:
          'isWithRadioItem',
        isSidebarWithMultitagItem:
          'isWithMultitagItem',
        isSidebarWithCommunitiesItem:
          'isWithCommunitiesItem'
      }
    ),
    isRenderFeedItem () {
      return (
        this.profileId &&
          this.isSidebarWithFeedItem
      )
    },
    isRenderConversationsItem () {
      return (
        this.profileId &&
          this.isSidebarWithConversationsItem
      )
    },
    isRenderLibraryItem () {
      return (
        this.profileId &&
          this.isSidebarWithLibraryItem
      )
    },
    isRenderRecommendationsItem () {
      return (
        this.profileId &&
          this.isSidebarWithRecommendationsItem
      )
    },
    isRenderFavoritesItem () {
      return (
        this.profileId &&
          this.isSidebarWithFavoritesItem
      )
    },
    isRenderBookmarksItem () {
      return (
        this.profileId &&
          this.isSidebarWithBookmarksItem
      )
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
