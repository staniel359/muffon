<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="sidebarText"
      is-horizontal
    />

    <div>
      <FeedOption />

      <ConversationsOption />

      <LibraryOption />

      <RecommendationsOption />

      <SavedTracksOption />

      <PlaylistsOption />

      <FavoritesOption />

      <BookmarksOption />

      <TopOption />

      <ReleasesOption />

      <RadioOption />

      <MultitagOption />

      <CommunitiesOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
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
    BaseDivider,
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
    sidebarText () {
      return this.$t(
        'settings.sections.app.sidebar'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.icon)
  margin-right: 0.5em
</style>
