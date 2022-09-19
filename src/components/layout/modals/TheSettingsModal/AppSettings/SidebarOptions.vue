<template>
  <div class="main-settings-options-block">
    <FeedOption
      v-if="profileId"
    />

    <ConversationsOption
      v-if="profileId"
    />

    <LibraryOption
      v-if="profileId"
    />

    <RecommendationsOption
      v-if="profileId"
    />

    <SavedTracksOption />

    <PlaylistsOption />

    <FavoritesOption
      v-if="profileId"
    />

    <BookmarksOption
      v-if="profileId"
    />

    <TopOption />

    <ReleasesOption />

    <RadioOption />

    <MultitagOption />

    <CommunitiesOption />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import FeedOption from './SidebarOptions/FeedOption.vue'
import ConversationsOption from './SidebarOptions/ConversationsOption.vue'
import LibraryOption from './SidebarOptions/LibraryOption.vue'
import RecommendationsOption from './SidebarOptions/RecommendationsOption.vue'
import SavedTracksOption from './SidebarOptions/SavedTracksOption.vue'
import PlaylistsOption from './SidebarOptions/PlaylistsOption.vue'
import FavoritesOption from './SidebarOptions/FavoritesOption.vue'
import BookmarksOption from './SidebarOptions/BookmarksOption.vue'
import TopOption from './SidebarOptions/TopOption.vue'
import ReleasesOption from './SidebarOptions/ReleasesOption.vue'
import RadioOption from './SidebarOptions/RadioOption.vue'
import MultitagOption from './SidebarOptions/MultitagOption.vue'
import CommunitiesOption from './SidebarOptions/CommunitiesOption.vue'

export default {
  name: 'SidebarOptions',
  components: {
    FeedOption,
    ConversationsOption,
    LibraryOption,
    RecommendationsOption,
    SavedTracksOption,
    PlaylistsOption,
    FavoritesOption,
    BookmarksOption,
    TopOption,
    ReleasesOption,
    RadioOption,
    MultitagOption,
    CommunitiesOption
  },
  computed: {
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
::v-deep(.icon)
  margin-right: 0.5em
</style>
