<template>
  <BaseMenuContainer
    class="vertical left overlay visible blurred sidebar the-sidebar-panel overflow-x-hidden"
    :class="transparentClass"
  >
    <div class="height-100 full-column">
      <ProfileItem
        v-if="profileId"
      />
      <RootItem
        v-else
      />

      <div
        class="top-section flex-full overflow-y-auto overflow-x-hidden"
        :class="{
          inverted: isDarkMode
        }"
      >
        <HomeItem
          v-if="isSidebarWithHomePageItem"
        />

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

        <HistoryItem
          v-if="isSidebarWithHistoryItem"
        />
      </div>

      <div class="bottom-section border-top">
        <SettingsItem />

        <HelpItem />

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
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import sidebarStore from '@/stores/sidebar'
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import ProfileItem from './TheSidebarPanel/ProfileItem.vue'
import RootItem from './TheSidebarPanel/RootItem.vue'
import HomeItem from './TheSidebarPanel/HomeItem.vue'
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
import HistoryItem from './TheSidebarPanel/HistoryItem.vue'
import SettingsItem from './TheSidebarPanel/SettingsItem.vue'
import HelpItem from './TheSidebarPanel/HelpItem.vue'
import LogoutItem from './TheSidebarPanel/LogoutItem.vue'
import LoginItem from './TheSidebarPanel/LoginItem.vue'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'TheSidebarPanel',
  components: {
    BaseMenuContainer,
    ProfileItem,
    RootItem,
    HomeItem,
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
    HistoryItem,
    SettingsItem,
    HelpItem,
    LogoutItem,
    LoginItem
  },
  mixins: [
    transparencyMixin
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      sidebarStore,
      {
        isSidebarWithHomePageItem:
          'isWithHomePageItem',
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
          'isWithCommunitiesItem',
        isSidebarWithHistoryItem:
          'isWithHistoryItem'
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

<style lang="sass" scoped></style>
