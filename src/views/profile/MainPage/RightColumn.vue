<template>
  <div class="main-profile-page-right-column">
    <PlayingSegment
      v-if="playing"
      :playing="playing"
    />

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
import PlayingSegment from './RightColumn/PlayingSegment.vue'
import LibrarySegment from './RightColumn/LibrarySegment.vue'
import PlaylistsSegment from './RightColumn/PlaylistsSegment.vue'
import FavoritesSegment from './RightColumn/FavoritesSegment.vue'
import CommunitiesSegment from './RightColumn/CommunitiesSegment.vue'
import PostsSegment from './RightColumn/PostsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    PlayingSegment,
    LibrarySegment,
    PlaylistsSegment,
    FavoritesSegment,
    CommunitiesSegment,
    PostsSegment
  },
  props: {
    profileData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    profileNickname () {
      return this.profileData.nickname
    },
    playing () {
      return this.profileData.playing
    }
  }
}
</script>

<style lang="sass" scoped></style>
