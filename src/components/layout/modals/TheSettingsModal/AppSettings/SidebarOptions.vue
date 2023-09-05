<template>
  <div class="main-settings-options-block">
    <OptionItem
      action-key="isWithHomePageItem"
      text-key="home"
      :is-checked="isSidebarWithHomePageItem"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithFeedItem"
      text-key="feed"
      :is-checked="isSidebarWithFeedItem"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithConversationsItem"
      text-key="conversations"
      :is-checked="isSidebarWithConversationsItem"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithLibraryItem"
      text-key="library"
      :is-checked="isSidebarWithLibraryItem"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithRecommendationsItem"
      text-key="recommendations"
      :is-checked="isSidebarWithRecommendationsItem"
    />

    <OptionItem
      action-key="isWithSavedTracksItem"
      text-key="savedTracks"
      :is-checked="isSidebarWithSavedTracksItem"
    />

    <OptionItem
      action-key="isWithPlaylistsItem"
      text-key="playlists"
      :is-checked="isSidebarWithPlaylistsItem"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithFavoritesItem"
      text-key="favorites"
      :is-checked="isSidebarWithFavoritesItem"
    />

    <OptionItem
      v-if="profileId"
      action-key="isWithBookmarksItem"
      text-key="bookmarks"
      :is-checked="isSidebarWithBookmarksItem"
    />

    <OptionItem
      action-key="isWithTopItem"
      text-key="top"
      :is-checked="isSidebarWithTopItem"
    />

    <OptionItem
      action-key="isWithReleasesItem"
      text-key="releases"
      :is-checked="isSidebarWithReleasesItem"
    />

    <OptionItem
      action-key="isWithRadioItem"
      text-key="radio"
      :is-checked="isSidebarWithRadioItem"
    />

    <OptionItem
      action-key="isWithMultitagItem"
      text-key="multitag"
      :is-checked="isSidebarWithMultitagItem"
    />

    <OptionItem
      action-key="isWithCommunitiesItem"
      text-key="communities"
      :is-checked="isSidebarWithCommunitiesItem"
    />

    <OptionItem
      action-key="isWithHistoryItem"
      text-key="history"
      :is-checked="isSidebarWithHistoryItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import sidebarStore from '@/stores/sidebar'
import OptionItem from './SidebarOptions/OptionItem.vue'

export default {
  name: 'SidebarOptions',
  components: {
    OptionItem
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
    )
  }
}
</script>

<style lang="sass" scoped></style>
