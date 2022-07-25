<template>
  <div class="main-profile-page-right-column">
    <LibrarySegment
      :profile-id="profileId"
      :profile-nickname="profileNickname"
    />

    <PlaylistsSegment
      :profile-id="profileId"
    />

    <FavoritesSegment
      :profile-id="profileId"
    />

    <CommunitiesSegment
      :profile-id="profileId"
    />

    <PostsSegment
      :profile-id="profileId"
    />
  </div>
</template>

<script>
import LibrarySegment from './RightColumn/LibrarySegment.vue'
import PlaylistsSegment from './RightColumn/PlaylistsSegment.vue'
import FavoritesSegment from './RightColumn/FavoritesSegment.vue'
import CommunitiesSegment from './RightColumn/CommunitiesSegment.vue'
import PostsSegment from './RightColumn/PostsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    LibrarySegment,
    PlaylistsSegment,
    FavoritesSegment,
    CommunitiesSegment,
    PostsSegment
  },
  props: {
    profileId: String,
    profileNickname: String
  }
}
</script>

<style lang="sass" scoped></style>
